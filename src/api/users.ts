import type { User } from '../types/user'

export const USERS_API_URL =
  'https://api-userapi.onrender.com/api/users/getUsers'

const API_KEY = 'elev-hemlighet-2026'

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(USERS_API_URL, {
    headers: { 'x-api-key': API_KEY },
  })

  if (!response.ok) {
    throw new Error(`Kunde inte hämta användare (status ${response.status}).`)
  }

  const users = await response.json()

  if (!Array.isArray(users)) {
    throw new Error('Servern returnerade data i oväntat format.')
  }

  return users as User[]
}