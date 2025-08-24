import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, ArrowDownIcon, Calendar, DollarSign } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface TransactionFormData {
  type: 'income' | 'expense';
  amount: string;
  category: string;
  description: string;
  date: string;
}

const expenseCategories = [
  "Food & Dining", "Transportation", "Entertainment", "Shopping", 
  "Bills & Utilities", "Healthcare", "Education", "Travel", "Other"
];

const incomeCategories = [
  "Salary", "Freelance", "Business", "Investments", "Rental", "Other"
];

const AddTransaction = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'expense';
  
  const form = useForm<TransactionFormData>({
    defaultValues: {
      type: initialType as 'income' | 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    }
  });

  const transactionType = form.watch('type');
  const categories = transactionType === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = (data: TransactionFormData) => {
    try {
      const transaction = {
        id: Date.now().toString(),
        type: data.type,
        amount: parseFloat(data.amount),
        category: data.category,
        description: data.description,
        date: data.date,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage with error handling
      const existingTransactions = JSON.parse(localStorage.getItem('financial-transactions') || '[]');
      existingTransactions.push(transaction);
      localStorage.setItem('financial-transactions', JSON.stringify(existingTransactions));

      toast({
        title: "Success!",
        description: `${data.type === 'income' ? 'Income' : 'Expense'} added successfully`,
      });

      navigate('/');
    } catch (error) {
      console.error('Error saving transaction:', error);
      toast({
        title: "Error",
        description: "Failed to save transaction. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Add Transaction</h1>
        <p className="text-muted-foreground">Record your income or expenses</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Transaction Type */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={transactionType === 'income' ? 'default' : 'outline'}
                  onClick={() => form.setValue('type', 'income')}
                  className="h-16 flex-col space-y-2"
                >
                  <ArrowUpIcon className="h-5 w-5" />
                  <span>Income</span>
                </Button>
                <Button
                  type="button"
                  variant={transactionType === 'expense' ? 'default' : 'outline'}
                  onClick={() => form.setValue('type', 'expense')}
                  className="h-16 flex-col space-y-2"
                >
                  <ArrowDownIcon className="h-5 w-5" />
                  <span>Expense</span>
                </Button>
              </div>

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                rules={{ 
                  required: "Amount is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Please enter a valid amount"
                  },
                  min: {
                    value: 0.01,
                    message: "Amount must be greater than 0"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="date"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Optional description..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex space-x-4">
                <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Adding...' : `Add ${transactionType === 'income' ? 'Income' : 'Expense'}`}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTransaction;