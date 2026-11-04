import { QueryClient } from '@tanstack/react-query'

/**
 * API:t tillåter bara 100 anrop per dygn. Därför cachas data länge och inga
 * onödiga bakgrundsanrop görs.
 */
export const CACHE_POLICY = {
  staleTimeMs: 1000 * 60 * 30,
  gcTimeMs: 1000 * 60 * 60 * 24,
} as const

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_POLICY.staleTimeMs,
      gcTime: CACHE_POLICY.gcTimeMs,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
