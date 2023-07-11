import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1h
      cacheTime: 1000 * 60 * 60, // 1h
      suspense: true,
    },
  },
});
