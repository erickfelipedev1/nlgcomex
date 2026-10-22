import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Rota servida na raiz do domínio. Definida por projeto na Vercel
 * (ex.: VITE_HOME_ROUTE=/joseolacyr em joseolacyr.vercel.app); sem ela, "/" é a landing.
 */
const HOME = import.meta.env["VITE_HOME_ROUTE"] as string | undefined;

const rewrite = HOME
  ? {
      input: ({ url }: { url: URL }) => {
        if (url.pathname === "/") url.pathname = HOME;
        return url;
      },
      output: ({ url }: { url: URL }) => {
        if (url.pathname === HOME) url.pathname = "/";
        return url;
      },
    }
  : undefined;

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...(rewrite ? { rewrite } : {}),
  });

  return router;
};
