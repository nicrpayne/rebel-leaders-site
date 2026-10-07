import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import { SessionProvider } from "./contexts/SessionContext";
import { initPostHog } from "./lib/analytics";
import "./index.css";

initPostHog();

const preloadRetryParam = "__asset_retry";
const currentUrl = new URL(window.location.href);
const hadPreloadRetryParam = currentUrl.searchParams.has(preloadRetryParam);
if (hadPreloadRetryParam) {
  currentUrl.searchParams.delete(preloadRetryParam);
  window.history.replaceState({}, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
}

window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  const retryUrl = new URL(window.location.href);
  if (retryUrl.searchParams.has(preloadRetryParam)) {
    console.error("[Asset loading] Reload retry already attempted", event);
    return;
  }
  retryUrl.searchParams.set(preloadRetryParam, "1");
  window.location.replace(retryUrl.toString());
});

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <App />
      </SessionProvider>
    </QueryClientProvider>
  </trpc.Provider>
);
