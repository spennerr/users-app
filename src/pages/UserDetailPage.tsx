import { Link, useParams } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import { StatusMessage } from '../components/StateViews/StatusMessage'
import {
  formatTheme,
  getActiveNotifications,
  getInitials,
} from '../utils/userFormatting'

export function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>()
  const { data, isPending, isError, error, refetch } = useUsers()

  if (isPending) {
    return (
      <section className="page">
        <StatusMessage
          variant="loading"
          title="Hämtar användare"
          description="Anropar API:et för att hämta användardata."
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
          description={error instanceof Error ? error.message : 'Ett okänt fel inträffade.'}
          action={
            <button type="button" className="button" onClick={() => void refetch()}>
              Försök igen
            </button>
          }
        />
      </section>
    )
  }

  const user = data?.find((candidate) => candidate.id === Number(userId))

  if (!user) {
    return (
      <section className="page">
        <StatusMessage
          variant="empty"
          title="Användaren hittades inte"
          description={`Ingen användare med id ${userId ?? ''} finns i datamängden.`}
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
  const notifications = getActiveNotifications(user)

  return (
    <section className="page">
      <Link className="page__back" to="/users">
        ← Tillbaka till användare
      </Link>

      <header className="detail__header">
        <span className="detail__avatar" aria-hidden="true">
          {getInitials(profile.name)}
        </span>
        <div>
          <h1>{profile.name}</h1>
          <p className="detail__username">@{user.username}</p>
        </div>
      </header>

      <div className="detail__body">
        <section className="panel">
          <h2>Kontaktuppgifter</h2>
          <dl className="detail__list">
            <div>
              <dt>E-post</dt>
              <dd>{profile.email}</dd>
            </div>
            <div>
              <dt>Adress</dt>
              <dd>
                {profile.address.street}, {profile.address.zipCode}{' '}
                {profile.address.city}
              </dd>
            </div>
          </dl>
        </section>

        <section className="panel">
          <h2>Inställningar</h2>
          <dl className="detail__list">
            <div>
              <dt>Tema</dt>
              <dd>{formatTheme(settings.theme)}</dd>
            </div>
            <div>
              <dt>Aktiva notiser</dt>
              <dd>{notifications.length > 0 ? notifications.join(' & ') : 'Inga'}</dd>
            </div>
            <div>
              <dt>Roller</dt>
              <dd>{roles.join(', ')}</dd>
            </div>
          </dl>
        </section>
      </div>
    </section>
  )
}