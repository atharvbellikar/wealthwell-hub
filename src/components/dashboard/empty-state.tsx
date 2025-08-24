import { PlusCircle, TrendingUp, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export function EmptyState() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <div className="h-24 w-24 mx-auto rounded-full bg-gradient-primary/10 flex items-center justify-center mb-6">
            <TrendingUp className="h-12 w-12 text-primary animate-float" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Welcome to FinanceTracker
          </h2>
          <p className="text-muted-foreground">
            Start your financial journey by adding your first transaction. 
            Once you have data, we'll show you powerful insights and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full mt-8">
          <Card className="border-dashed border-2 border-border/50 hover:border-primary/50 transition-colors cursor-pointer group"
                onClick={() => navigate('/add-transaction')}>
            <CardContent className="p-6 text-center">
              <PlusCircle className="h-8 w-8 mx-auto text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">Add Your First Transaction</h3>
              <p className="text-sm text-muted-foreground">Record income or expenses</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/analytics')}
              className="h-auto py-4 flex-col space-y-2"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs">View Analytics</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/investments')}
              className="h-auto py-4 flex-col space-y-2"
            >
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Track Investments</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}