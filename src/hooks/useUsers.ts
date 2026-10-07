import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { USERS_ENDPOINT, fetchUsers } from '../api/users'
import { RATE_LIMIT_PER_DAY } from '../api/client'
import type { User } from '../types/user'

export const USERS_QUERY_KEY = ['users'] as const

/**
 * Data cachas aggressivt eftersom API:t begränsas till
 * RATE_LIMIT_PER_DAY anrop per dygn. Ingen bakgrundsrefetchning sker och
 * fönsterfokus triggar inte nya anrop.
 */
export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: USERS_QUERY_KEY,
    queryFn: ({ signal }) => fetchUsers(signal),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
    retry: 1,
  })
}

export const queryCachePolicy = {
  /** Tid data betraktas som färsk, innan nytt anrop kan göras. */
  staleTimeMinutes: 30,
  /** Tid den inaktiva cachen behålls i minne. */
  gcTimeHours: 24,
  dailyRequestLimit: RATE_LIMIT_PER_DAY,
  endpoint: USERS_ENDPOINT,
}