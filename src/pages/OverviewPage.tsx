import { Link } from 'react-router-dom'
import { API_KEY_HEADER } from '../api/client'
import { USERS_ENDPOINT } from '../api/users'
import { queryCachePolicy, useUsers } from '../hooks/useUsers'

export function OverviewPage() {
  const { data, isPending, isError } = useUsers()

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
            {isPending ? '…' : isError ? 'Ej tillgängligt' : (data?.length ?? 0)}
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
            {queryCachePolicy.staleTimeMinutes} minuter
          </p>
        </article>
      </div>

      <section className="panel">
        <h2>Tekniska val</h2>
        <ul className="feature-list">
          <li>Routing med react-router-dom: översikt, lista och detaljvy.</li>
          <li>Hämtning och cachning via TanStack Query (useQuery).</li>
          <li>Strikt typning med TypeScript för props och API-svar.</li>
          <li>Modulära komponenter med tydligt separerade ansvar.</li>
        </ul>
        <Link className="button" to="/users">
          Till användarlistan
        </Link>
      </section>
    </section>
  )
}