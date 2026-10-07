import type { User } from '../types/user'
import { apiRequest } from './client'

export const USERS_ENDPOINT = '/users/getUsers'

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const users = await apiRequest<User[]>(USERS_ENDPOINT, { signal })

  if (!Array.isArray(users)) {
    throw new Error('API:et returnerade inte en lista med användare.')
  }

  return users
}