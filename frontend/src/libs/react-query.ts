import { DefaultOptions, QueryClient } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
    networkMode: "always",
    staleTime: 1000 * 60 * 5, // 5 minutes
  },
  mutations: {
    useErrorBoundary: true,
    retry: false,
    networkMode: "always",
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
