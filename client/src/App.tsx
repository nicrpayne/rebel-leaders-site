import { Toaster } from "@/components/ui/sonner";
import { useClaimAnonymousResult } from "@/_core/hooks/useClaimAnonymousResult";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch, Redirect, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider } from "./contexts/GameContext";
import GameHud from "./components/GameHud";
import Home from "./pages/Home";

const Manifesto = lazy(() => import("./pages/Manifesto"));
const Archives = lazy(() => import("./pages/Archives"));
const Shelf = lazy(() => import("./pages/Shelf"));
const Residency = lazy(() => import("./pages/Residency"));
const About = lazy(() => import("./pages/About"));
const StartHere = lazy(() => import("./pages/StartHere"));
const Game = lazy(() => import("./pages/Game"));
const Book = lazy(() => import("./pages/Book"));
const Community = lazy(() => import("./pages/Community"));
const Mirror = lazy(() => import("./pages/Mirror"));
const Workbench = lazy(() => import("./pages/Workbench"));
const GravityCheck = lazy(() => import("./pages/workbench/GravityCheck"));
const Results = lazy(() => import("./pages/workbench/Results"));
const Codex = lazy(() => import("./pages/workbench/Codex"));
const MirrorFlow = lazy(() => import("./pages/workbench/MirrorFlow"));
const MirrorReading = lazy(() => import("./pages/workbench/MirrorReading"));
const Praxis = lazy(() => import("./pages/workbench/Praxis"));
const GameStandalone = lazy(() => import("./pages/GameStandalone"));
const HiddenAssets = lazy(() => import("./pages/HiddenAssets"));
const Admin = lazy(() => import("./pages/Admin"));
const WallIndex = lazy(() => import("./pages/wall/WallIndex"));
const WallPage = lazy(() => import("./pages/wall/WallPage"));
const WallAdmin = lazy(() => import("./pages/wall/WallAdmin"));
const AuthVerify = lazy(() => import("./pages/AuthVerify"));
const FieldTools = lazy(() => import("./pages/FieldTools"));
const FieldToolLanding = lazy(() => import("./pages/FieldToolLanding"));
const PressureTest = lazy(() => import("./pages/PressureTest"));
const FieldToolLab = lazy(() => import("./pages/FieldToolLab"));

function RouteLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
      <p className="font-mono text-sm tracking-wider text-primary">LOADING NEXT AREA...</p>
    </main>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteLoading />}>
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
        <Route path="/field-tools" component={FieldTools} />
        <Route path="/field-tools/:slug/lab">
          {(params: { slug: string }) => <FieldToolLab slug={params.slug} />}
        </Route>
        <Route path="/field-tools/:slug">
          {(params: { slug: string }) => <FieldToolLanding slug={params.slug} />}
        </Route>
        <Route path="/assessment" component={PressureTest} />
        <Route path="/workbench" component={Workbench} />
        <Route path="/workbench/gravitas" component={GravityCheck} />
        <Route path="/workbench/results" component={Results} />
        <Route path="/workbench/codex" component={Codex} />
        <Route path="/workbench/mirror" component={MirrorFlow} />
        <Route path="/workbench/mirror/reading" component={MirrorReading} />
        <Route path="/workbench/praxis" component={Praxis} />
        <Route path="/armory">{() => { window.location.href = "/workbench"; return null; }}</Route>
        <Route path="/game-standalone" component={GameStandalone} />
        <Route path="/hidden-assets" component={HiddenAssets} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin/wall" component={WallAdmin} />
        <Route path="/auth/verify" component={AuthVerify} />
        {/* Legacy redirects — keep old /wall URLs working */}
        <Route path="/wall/:wallCode">
          {(params: { wallCode: string }) => <Redirect to={`/workbench/wall/${params.wallCode}`} />}
        </Route>
        <Route path="/wall">
          <Redirect to="/workbench/wall" />
        </Route>
        {/* Canonical Wall routes under workbench */}
        <Route path="/workbench/wall" component={WallIndex} />
        <Route path="/workbench/wall/:wallCode" component={WallPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function ContextualGameHud() {
  const [location] = useLocation();
  if (location.startsWith("/field-tools") || location === "/assessment") return null;
  return <GameHud />;
}

function App() {
  useClaimAnonymousResult();
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <GameProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <ContextualGameHud />
          </TooltipProvider>
        </GameProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
