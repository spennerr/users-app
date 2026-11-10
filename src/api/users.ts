import type { User } from '../types/user'

export const USERS_API_URL =
  'https://api-userapi.onrender.com/api/users/getUsers'

const API_KEY = 'elev-hemlighet-2026'

export async function fetchUsers(): Promise<User[]> {
  let response: Response

  try {
    response = await fetch(USERS_API_URL, {
      headers: { 'x-api-key': API_KEY },
    })
  } catch {
    throw new Error('Kunde inte nå servern. Kontrollera din internetanslutning.')
  }

  if (!response.ok) {
    const message =
      response.status >= 500
        ? 'Servern är tillfälligt otillgänglig. Försök igen om en stund.'
        : `Kunde inte hämta användare (status ${response.status}).`

    throw new Error(message)
  }

  const users: unknown = await response.json()

  if (!Array.isArray(users)) {
    throw new Error('Servern returnerade data i ett oväntat format.')
  }

  return users as User[]
}
