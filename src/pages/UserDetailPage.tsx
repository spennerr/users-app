import { Link, useParams } from 'react-router-dom'
import { StatusMessage } from '../components/StatusMessage'
import { useUsers } from '../hooks/useUsers'

export function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>()
  const { data, isPending, isError, error, refetch } = useUsers()

  if (isPending) {
    return (
      <section className="page">
        <StatusMessage
          variant="loading"
          title="Hämtar användare"
          description="Väntar på svar från API:et."
        />
      </section>
    )
  }

  if (isError) {
    return (
      <section className="page">
        <StatusMessage
          variant="error"
          title="Kunde inte hämta användare"
          description={error.message}
          onRetry={refetch}
        />
      </section>
    )
  }

  // Ingen ny hämtning: användaren letas upp i listan som redan ligger i cachen.
  const user = data?.find((candidate) => candidate.id === Number(userId))

  if (!user) {
    return (
      <section className="page">
        <StatusMessage
          variant="empty"
          title="Användaren hittades inte"
          description={`Ingen användare med id ${userId ?? ''} finns i listan.`}
          action={
            <Link className="button" to="/users">
              Tillbaka till listan
            </Link>
          }
        />
      </section>
    )
  }

  const { profile, settings, roles } = user
  const { email, push } = settings.notifications

  const notifications = [email && 'E-post', push && 'Push']
    .filter(Boolean)
    .join(' & ')

  const rows = [
    ['E-post', profile.email],
    [
      'Adress',
      `${profile.address.street}, ${profile.address.zipCode} ${profile.address.city}`,
    ],
    ['Tema', settings.theme === 'dark' ? 'Mörkt läge' : 'Ljust läge'],
    ['Aktiva notiser', notifications || 'Inga'],
    ['Roller', roles.join(', ')],
  ]

  return (
    <section className="page">
      <Link className="page__back" to="/users">
        ← Tillbaka till användare
      </Link>

      <header className="detail__header">
        <span className="detail__avatar" aria-hidden="true">
          {profile.name[0].toUpperCase()}
        </span>
        <div>
          <h1>{profile.name}</h1>
          <p className="detail__username">@{user.username}</p>
        </div>
      </header>

      <section className="panel">
        <h2>Uppgifter</h2>
        <dl className="detail__list">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  )
}
