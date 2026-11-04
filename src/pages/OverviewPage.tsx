import { Link } from 'react-router-dom'
import { API_KEY_HEADER } from '../api/client'
import { USERS_ENDPOINT } from '../api/users'
import { CACHE_POLICY } from '../config/queryClient'
import { ROUTE_PATHS } from '../config/routes'
import { useUsers } from '../hooks/useUsers'
import { getErrorMessage } from '../utils/errors'
import { StatusMessage } from '../components/StateViews/StatusMessage'

export function OverviewPage() {
  const { data, isPending, isError, error, refetch } = useUsers()
  const users = data ?? []

  return (
    <section className="page">
      <header className="page__header">
        <h1>Översikt</h1>
        <p>
          En React-applikation som läser användare från ett externt REST-API
          och presenterar dem i en responsiv, typad SPA.
        </p>
      </header>

      <div className="stat-grid">
        <article className="stat">
          <h2>Användare i datamängden</h2>
          <p className="stat__value">
            {isPending ? '…' : isError ? 'Ej tillgängligt' : users.length}
          </p>
        </article>
        <article className="stat">
          <h2>Endpoint</h2>
          <p className="stat__value stat__value--small">
            <code>{USERS_ENDPOINT}</code>
          </p>
        </article>
        <article className="stat">
          <h2>API-nyckel</h2>
          <p className="stat__value stat__value--small">
            <code>{API_KEY_HEADER}</code>
          </p>
        </article>
        <article className="stat">
          <h2>Cachetid</h2>
          <p className="stat__value stat__value--small">
            {Math.round(CACHE_POLICY.staleTimeMs / 60_000)} minuter
          </p>
        </article>
      </div>

      {isError && (
        <StatusMessage
          variant="error"
          title="Kunde inte hämta översikten"
          description={getErrorMessage(error)}
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
          description="API:et returnerade en tom lista. Försök igen om du förväntar dig data."
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

      <section className="panel">
        <h2>Tekniska val</h2>
        <ul className="feature-list">
          <li>Routing med react-router-dom: översikt, lista och detaljvy.</li>
          <li>Hämtning och cachning via TanStack Query (useQuery).</li>
          <li>Strikt typning med TypeScript för props och API-svar.</li>
          <li>Modulära komponenter med tydligt separerade ansvar.</li>
        </ul>
        <Link className="button" to={ROUTE_PATHS.users}>
          Till användarlistan
        </Link>
      </section>
    </section>
  )
}
