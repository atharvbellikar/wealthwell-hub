import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppLayout } from "@/components/layout/app-layout";
import Index from "./pages/Index";
import AddTransaction from "./pages/AddTransaction";
import Analytics from "./pages/Analytics";
import Investments from "./pages/Investments";
import Budget from "./pages/Budget";
import Rewards from "./pages/Rewards";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="financial-tracker-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
