/** Alla rutter på ett ställe, så att navigering och länkar aldrig går isär. */
export const ROUTE_PATHS = {
  overview: '/',
  users: '/users',
  userDetail: '/users/:userId',
} as const

export function userDetailPath(userId: string | number): string {
  return `/users/${userId}`
}
