import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/users'
import type { User } from '../types/user'

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}
