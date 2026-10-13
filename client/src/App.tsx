/**
 * RENOVATION LEDGER APP SHELL
 * A light editorial shell lets Oxford navy, warm paper, real property photography,
 * and disciplined renovation-green signals carry the brand.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SoldProject from "./pages/SoldProject";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sold/1210-miremont-drive" component={SoldProject} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
