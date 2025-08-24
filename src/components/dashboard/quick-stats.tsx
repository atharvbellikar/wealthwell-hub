import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickStatsProps {
  totalIncome: number
  totalExpenses: number
  netWorth: number
  monthlyGrowth: number
}

export function QuickStats({ totalIncome, totalExpenses, netWorth, monthlyGrowth }: QuickStatsProps) {
  const stats = [
    {
      title: "Total Income",
      value: totalIncome,
      icon: ArrowUpIcon,
      trend: "+12.5%",
      trendUp: true,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: ArrowDownIcon,
      trend: "+8.3%",
      trendUp: false,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Net Worth",
      value: netWorth,
      icon: Wallet,
      trend: "+15.2%",
      trendUp: true,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Monthly Growth",
      value: monthlyGrowth,
      icon: TrendingUp,
      trend: "+4.7%",
      trendUp: true,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('selected-currency')
    return saved || 'USD'
  })

  useEffect(() => {
    const handleCurrencyChange = (event: any) => {
      setCurrency(event.detail.currency.code)
    }
    
    window.addEventListener('currencyChanged', handleCurrencyChange)
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", stat.bgColor)}>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">
                {formatCurrency(stat.value)}
              </div>
              <div className="flex items-center text-xs">
                <span className={cn(
                  "flex items-center",
                  stat.trendUp ? "text-success" : "text-warning"
                )}>
                  {stat.trendUp ? (
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {stat.trend}
                </span>
                <span className="text-muted-foreground ml-2">from last month</span>
              </div>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
        </Card>
      ))}
    </div>
  )
}