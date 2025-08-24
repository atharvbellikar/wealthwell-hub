import { Wallet, MessageCircle } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CurrencySelector } from "@/components/ui/currency-selector"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FinanceTracker</h1>
              <p className="text-xs text-muted-foreground -mt-1">Professional Edition</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <CurrencySelector />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card-hover"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}