import { NavLink } from "react-router-dom"
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  MessageCircle,
  PieChart
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Financial overview"
  },
  {
    title: "Add Transaction",
    href: "/add-transaction",
    icon: PlusCircle,
    description: "Record income & expenses"
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Spending insights"
  },
  {
    title: "Investments",
    href: "/investments",
    icon: TrendingUp,
    description: "Portfolio tracking"
  },
  {
    title: "Budget Planner",
    href: "/budget",
    icon: PieChart,
    description: "Budget management"
  },
  {
    title: "Rewards",
    href: "/rewards",
    icon: Trophy,
    description: "Achievements & goals"
  },
  {
    title: "Assistant",
    href: "/chat",
    icon: MessageCircle,
    description: "Financial advice"
  }
]

export function Navigation() {
  return (
    <nav className="flex-1 space-y-2 p-4">
      {navigationItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              "hover:bg-accent/50 hover:shadow-sm",
              isActive
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )
          }
        >
          <item.icon className="h-5 w-5" />
          <div className="flex-1">
            <div className="font-medium">{item.title}</div>
            <div className="text-xs text-muted-foreground/70">{item.description}</div>
          </div>
        </NavLink>
      ))}
    </nav>
  )
}