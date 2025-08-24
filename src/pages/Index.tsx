import { useState, useEffect } from "react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, BarChart3, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const checkForData = () => {
      try {
        const transactions = localStorage.getItem('financial-transactions');
        const investments = localStorage.getItem('financial-investments');
        setHasData(!!(transactions && JSON.parse(transactions).length > 0) || !!(investments && JSON.parse(investments).length > 0));
      } catch (error) {
        console.error('Error reading localStorage:', error);
        setHasData(false);
      }
    };
    
    checkForData();
  }, []);

  // Mock data for demonstration (replace with real data from localStorage/API)
  const mockStats = {
    totalIncome: 8500,
    totalExpenses: 3200,
    netWorth: 45600,
    monthlyGrowth: 1250
  };

  const quickActions = [
    {
      title: "Add Income",
      description: "Record salary or other income",
      icon: PlusCircle,
      color: "text-success",
      bgColor: "bg-success/10",
      href: "/add-transaction?type=income"
    },
    {
      title: "Add Expense",
      description: "Track your spending",
      icon: PlusCircle,
      color: "text-warning",
      bgColor: "bg-warning/10",
      href: "/add-transaction?type=expense"
    },
    {
      title: "View Analytics",
      description: "Spending insights & trends",
      icon: BarChart3,
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: "/analytics"
    },
    {
      title: "Investment Tracker",
      description: "Portfolio performance",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
      href: "/investments"
    }
  ];

  if (!hasData) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Financial Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your financial overview for this month.
        </p>
      </div>

      {/* Quick Stats */}
      <QuickStats {...mockStats} />

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={action.title}
              className="cursor-pointer group hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(action.href)}
            >
              <CardContent className="p-6 text-center">
                <div className={`h-12 w-12 mx-auto rounded-lg ${action.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center text-muted-foreground py-8">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Recent transactions will appear here</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/add-transaction')}>
                  Add First Transaction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Financial Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center text-muted-foreground py-8">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Set your financial goals to track progress</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/budget')}>
                  Create Budget
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
