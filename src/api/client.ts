export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api-userapi.onrender.com/api'

export const API_KEY_HEADER = 'x-api-key'

/** Kursens publika demonyckel. Kan overridas med VITE_API_KEY i en .env-fil. */
export const API_KEY = import.meta.env.VITE_API_KEY ?? 'elev-hemlighet-2026'

/** Antal anrop per dag som API:t tillåter. */
export const RATE_LIMIT_PER_DAY = 100

/** Hur länge ett anrop får vänta innan det avbryts. */
export const REQUEST_TIMEOUT_MS = 15_000

export class ApiError extends Error {
  /** HTTP-status, eller 0 när servern inte kunde nås alls. */
  readonly status: number
  /** Teknisk information som är användbar vid felsökning, men inte visas för användaren. */
  readonly detail?: string

  constructor(message: string, status: number, detail?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.detail = detail
  }
}

function messageForStatus(status: number): string {
  if (status === 401) {
    return 'API-nyckeln saknas eller är ogiltig. Kontrollera inställningarna och försök igen.'
  }

  if (status === 403) {
    return 'Du har inte behörighet att läsa den här informationen.'
  }

  if (status === 404) {
    return 'Resursen kunde inte hittas på servern.'
  }

  if (status === 429) {
    return 'För många anrop mot API:et just nu. Vänta en stund och försök igen.'
  }

  if (status >= 500) {
    return 'Servern är tillfälligt otillgänglig. Försök igen om en stund.'
  }

  return 'Servern kunde inte hantera begäran. Försök igen.'
}

export interface RequestOptions {
  signal?: AbortSignal
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const controller = new AbortController()
  let timedOut = false

  const timeoutId = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, REQUEST_TIMEOUT_MS)

  const abortFromCaller = () => controller.abort()

  if (options.signal) {
    if (options.signal.aborted) {
      controller.abort()
    } else {
      options.signal.addEventListener('abort', abortFromCaller, { once: true })
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { [API_KEY_HEADER]: API_KEY },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new ApiError(
        messageForStatus(response.status),
        response.status,
        `${response.status} ${response.statusText}`,
      )
    }

    try {
      return (await response.json()) as T
    } catch {
      throw new ApiError(
        'Servern svarade med data som inte kunde läsas. Försök igen senare.',
        response.status,
        'Svaret kunde inte tolkas som JSON.',
      )
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    // React Query avbryter anropet när komponenten försvinner – det är inget fel.
    if (options.signal?.aborted) {
      throw error
    }

    if (timedOut) {
      throw new ApiError(
        'Anropet tog för lång tid. Servern kan vara överbelastad – försök igen.',
        0,
        'Tidsgränsen för anropet överskreds.',
      )
    }

    throw new ApiError(
      'Kunde inte nå servern. Kontrollera din internetanslutning och försök igen.',
      0,
      error instanceof Error ? error.message : 'Okänt nätverksfel.',
    )
  } finally {
    clearTimeout(timeoutId)
    options.signal?.removeEventListener('abort', abortFromCaller)
  }
}
