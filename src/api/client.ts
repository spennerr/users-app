export const API_BASE_URL = 'https://api-userapi.onrender.com/api'
export const API_KEY_HEADER = 'x-api-key'
export const API_KEY = 'elev-hemlighet-2026'

/** Antal anrop per dag som API:t tillåter. */
export const RATE_LIMIT_PER_DAY = 100

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export interface RequestOptions {
  signal?: AbortSignal
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { [API_KEY_HEADER]: API_KEY },
    signal: options.signal,
  })

  if (!response.ok) {
    throw new ApiError(
      `Servern svarade med ${response.status} ${response.statusText}.`,
      response.status,
    )
  }

  return (await response.json()) as T
}