import { Link } from 'react-router-dom'
import { USERS_API_URL } from '../api/users'
import { StatusMessage } from '../components/StateViews/StatusMessage'
import { useUsers } from '../hooks/useUsers'

export function OverviewPage() {
  const { data, isPending, isError, error, refetch } = useUsers()
  const users = data ?? []

  return (
    <section className="page">
      <header className="page__header">
        <h1>Översikt</h1>
        <p>
          En React-app som hämtar användare från ett externt REST-API och visar
          dem i en lista och en detaljvy.
        </p>
      </header>

      <div className="stat-grid">
        <article className="stat">
          <h2>Användare</h2>
          <p className="stat__value">
            {isPending ? '…' : isError ? '–' : users.length}
          </p>
        </article>
        <article className="stat">
          <h2>Endpoint</h2>
          <p className="stat__value stat__value--small">
            <code>{USERS_API_URL}</code>
          </p>
        </article>
        <article className="stat">
          <h2>API-nyckel</h2>
          <p className="stat__value stat__value--small">
            <code>x-api-key</code>
          </p>
        </article>
        <article className="stat">
          <h2>Cachetid</h2>
          <p className="stat__value stat__value--small">30 minuter</p>
        </article>
      </div>

      {isError && (
        <StatusMessage
          variant="error"
          title="Kunde inte hämta översikten"
          description={error.message}
          action={
            <button
              type="button"
              className="button"
              onClick={() => void refetch()}
            >
              Försök igen
            </button>
          }
        />
      )}

      {!isPending && !isError && users.length === 0 && (
        <StatusMessage
          variant="empty"
          title="Inga användare att visa"
          description="API:et returnerade en tom lista."
          action={
            <button
              type="button"
              className="button"
              onClick={() => void refetch()}
            >
              Försök igen
            </button>
          }
        />
      )}

      <Link className="button" to="/users">
        Till användarlistan
      </Link>
    </section>
  )
}
