import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, PieChart, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const transactions = localStorage.getItem('financial-transactions');
    setHasData(!!(transactions && JSON.parse(transactions).length > 0));
  }, []);

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-center space-y-4">
          <div className="h-24 w-24 mx-auto rounded-full bg-gradient-primary/10 flex items-center justify-center">
            <BarChart3 className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">No Data to Analyze</h2>
          <p className="text-muted-foreground max-w-md">
            Start by adding some transactions to see powerful analytics and insights about your spending patterns.
          </p>
          <Button onClick={() => navigate('/add-transaction')} className="mt-4">
            Add Your First Transaction
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Detailed analysis of your financial patterns and trends
        </p>
      </div>

      {/* Analytics cards will be populated with real data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Spending Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Monthly spending analysis</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Category Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Expense by category</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Predictions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Next month forecasts</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;