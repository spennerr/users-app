import type { User } from '../../types/user'
import { UserCard } from './UserCard'

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  return (
    <ul className="grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  )
}