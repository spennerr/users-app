import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="page">
      <div className="status status--empty">
        <div className="status__text">
          <h1 className="status__title">Sidan hittades inte</h1>
          <p className="status__description">
            Adressen du besöker finns inte i applikationen.
          </p>
        </div>
        <Link className="button" to="/">
          Till översikten
        </Link>
      </div>
    </section>
  )
}