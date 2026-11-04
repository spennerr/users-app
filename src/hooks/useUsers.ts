import { useQuery } from '@tanstack/react-query'
import { ApiError } from '../api/client'
import { fetchUsers } from '../api/users'
import { CACHE_POLICY } from '../config/queryClient'
import type { User } from '../types/user'

export const USERS_QUERY_KEY = ['users'] as const

/**
 * Data cachas aggressivt eftersom API:t begränsas till 100 anrop per dygn.
 * Ingen bakgrundsrefetchning sker och fönsterfokus triggar inte nya anrop.
 */
export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: USERS_QUERY_KEY,
    queryFn: ({ signal }) => fetchUsers(signal),
    staleTime: CACHE_POLICY.staleTimeMs,
    gcTime: CACHE_POLICY.gcTimeMs,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: (failureCount, error) => {
      // Autentiserings-, behörighets- och kvotfel löses inte av ett nytt försök.
      if (
        error instanceof ApiError &&
        [401, 403, 404, 429].includes(error.status)
      ) {
        return false
      }

      return failureCount < 1
    },
  })
}
