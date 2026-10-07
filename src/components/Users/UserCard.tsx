import { Link } from 'react-router-dom'
import type { User } from '../../types/user'
import { getActiveNotifications, getInitials } from '../../utils/userFormatting'

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const { profile, roles } = user
  const notifications = getActiveNotifications(user)

  return (
    <li className="card">
      <div className="card__header">
        <span className="card__avatar" aria-hidden="true">
          {getInitials(profile.name)}
        </span>
        <div>
          <h3 className="card__name">{profile.name}</h3>
          <p className="card__username">@{user.username}</p>
        </div>
      </div>

      <dl className="card__meta">
        <div>
          <dt>Stad</dt>
          <dd>{profile.address.city}</dd>
        </div>
        <div>
          <dt>Roller</dt>
          <dd>{roles.join(', ')}</dd>
        </div>
        <div>
          <dt>Notiser</dt>
          <dd>{notifications.length > 0 ? notifications.join(' & ') : 'Avstängda'}</dd>
        </div>
      </dl>

      <Link className="card__link" to={`/users/${user.id}`}>
        Visa detaljer
      </Link>
    </li>
  )
}