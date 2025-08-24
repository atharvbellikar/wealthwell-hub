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
  
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>(initialType as 'income' | 'expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const transaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: parseFloat(amount),
      category,
      description,
      date,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingTransactions = JSON.parse(localStorage.getItem('financial-transactions') || '[]');
    existingTransactions.push(transaction);
    localStorage.setItem('financial-transactions', JSON.stringify(existingTransactions));

    toast({
      title: "Success!",
      description: `${transactionType === 'income' ? 'Income' : 'Expense'} added successfully`,
    });

    navigate('/');
  };

  const categories = transactionType === 'income' ? incomeCategories : expenseCategories;

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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={transactionType === 'income' ? 'default' : 'outline'}
                onClick={() => setTransactionType('income')}
                className="h-16 flex-col space-y-2"
              >
                <ArrowUpIcon className="h-5 w-5" />
                <span>Income</span>
              </Button>
              <Button
                type="button"
                variant={transactionType === 'expense' ? 'default' : 'outline'}
                onClick={() => setTransactionType('expense')}
                className="h-16 flex-col space-y-2"
              >
                <ArrowDownIcon className="h-5 w-5" />
                <span>Expense</span>
              </Button>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">
                Add {transactionType === 'income' ? 'Income' : 'Expense'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTransaction;