import type { User } from '../types/user'
import { ApiError, apiRequest } from './client'

export const USERS_ENDPOINT = '/users/getUsers'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Kontrollerar att svaret har den form som appen förväntar sig. Det gör att
 * oväntad data från API:et ger ett tydligt felmeddelande i stället för en krasch
 * inne i en komponent.
 */
function isUser(value: unknown): value is User {
  if (!isRecord(value) || !isRecord(value.profile) || !isRecord(value.settings)) {
    return false
  }

  const { profile, settings } = value
  const address = profile.address
  const notifications = settings.notifications

  return (
    typeof value.id === 'number' &&
    typeof value.username === 'string' &&
    typeof profile.name === 'string' &&
    typeof profile.email === 'string' &&
    isRecord(address) &&
    typeof address.street === 'string' &&
    typeof address.city === 'string' &&
    typeof address.zipCode === 'string' &&
    (settings.theme === 'dark' || settings.theme === 'light') &&
    isRecord(notifications) &&
    typeof notifications.email === 'boolean' &&
    typeof notifications.push === 'boolean' &&
    Array.isArray(value.roles) &&
    value.roles.every((role) => typeof role === 'string')
  )
}

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const users = await apiRequest<unknown>(USERS_ENDPOINT, { signal })

  if (!Array.isArray(users)) {
    throw new ApiError(
      'Servern returnerade data i ett oväntat format. Försök igen senare.',
      0,
      'Förväntade en lista med användare.',
    )
  }

  if (!users.every(isUser)) {
    throw new ApiError(
      'Servern returnerade ofullständig användardata. Försök igen senare.',
      0,
      'Minst en användare saknade obligatoriska fält.',
    )
  }

  return users
}
