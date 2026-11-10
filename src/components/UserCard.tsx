import { Link } from 'react-router-dom'
import type { User } from '../types/user'

type UserCardProps = {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const { profile, settings, roles } = user
  const { email, push } = settings.notifications

  const notifications = [email && 'E-post', push && 'Push']
    .filter(Boolean)
    .join(' & ')

  const rows = [
    ['Stad', profile.address.city],
    ['Roller', roles.join(', ')],
    ['Notiser', notifications || 'Avstängda'],
  ]

  return (
    <li className="card">
      <div className="card__header">
        <span className="card__avatar" aria-hidden="true">
          {profile.name[0].toUpperCase()}
        </span>
        <div>
          <h3 className="card__name">{profile.name}</h3>
          <p className="card__username">@{user.username}</p>
        </div>
      </div>

      <dl className="card__meta">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <Link className="card__link" to={`/users/${user.id}`}>
        Visa detaljer
      </Link>
    </li>
  )
}
