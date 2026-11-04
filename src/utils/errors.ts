import { ApiError } from '../api/client'

const FALLBACK_MESSAGE =
  'Ett oväntat fel inträffade. Försök igen om en stund.'

/**
 * Returnerar alltid ett meddelande som är skrivet för användaren. Tekniska fel
 * loggas i konsolen i stället för att visas i gränssnittet.
 */
export function getErrorMessage(
  error: unknown,
  fallback: string = FALLBACK_MESSAGE,
): string {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error) {
    console.error('Oväntat fel:', error)
  }

  return fallback
}
