export type Theme = 'dark' | 'light'

export interface Address {
  street: string
  city: string
  zipCode: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
}

export interface UserSettings {
  theme: Theme
  notifications: NotificationSettings
}

export interface UserProfile {
  name: string
  email: string
  address: Address
}

export interface User {
  id: number
  username: string
  profile: UserProfile
  settings: UserSettings
  roles: string[]
}

export type UserRole = User['roles'][number]