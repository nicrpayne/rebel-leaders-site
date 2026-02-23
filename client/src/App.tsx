import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider } from "./contexts/GameContext";
import GameHud from "./components/GameHud";
import Home from "./pages/Home";
import Manifesto from "./pages/Manifesto";
import Archives from "./pages/Archives";
import Shelf from "./pages/Shelf";
import Residency from "./pages/Residency";
import About from "./pages/About";
import StartHere from "./pages/StartHere";
import Game from "./pages/Game";
import Book from "./pages/Book";
import Community from "./pages/Community";
import Mirror from "./pages/Mirror";
import Armory from "./pages/Armory";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/manifesto" component={Manifesto} />
      <Route path="/archives" component={Archives} />
      <Route path="/shelf" component={Shelf} />
      <Route path="/residency" component={Residency} />
      <Route path="/about" component={About} />
      <Route path="/start" component={StartHere} />
      <Route path="/game" component={Game} />
      <Route path="/book" component={Book} />
      <Route path="/community" component={Community} />
      <Route path="/mirror" component={Mirror} />
      <Route path="/armory" component={Armory} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <GameProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <GameHud />
          </TooltipProvider>
        </GameProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
