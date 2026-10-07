import type { Theme } from '../types/user'

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function formatTheme(theme: Theme): string {
  return theme === 'dark' ? 'Mörkt läge' : 'Ljust läge'
}

export function getActiveNotifications(user: {
  settings: { notifications: { email: boolean; push: boolean } }
}): string[] {
  const { email, push } = user.settings.notifications
  return [
    email ? 'E-post' : null,
    push ? 'Push' : null,
  ].filter((label): label is string => label !== null)
}