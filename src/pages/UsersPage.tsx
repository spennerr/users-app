import { useState } from 'react'
import { StatusMessage } from '../components/StatusMessage'
import { UserCard } from '../components/UserCard'
import { useUsers } from '../hooks/useUsers'

export function UsersPage() {
  const { data, isPending, isError, error, refetch } = useUsers()
  const [search, setSearch] = useState('')

  const users = data ?? []
  const visibleUsers = users.filter((user) =>
    `${user.profile.name} ${user.username} ${user.profile.email} ${user.profile.address.city} ${user.roles.join(' ')}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  return (
    <section className="page">
      <header className="page__header">
        <h1>Användare</h1>
        <p>
          Listan hämtas en gång från API:et och sparas i cachen. Sökningen sker
          i webbläsaren.
        </p>
      </header>

      {isPending && (
        <StatusMessage
          variant="loading"
          title="Hämtar användare"
          description="Väntar på svar från API:et."
        />
      )}

      {isError && (
        <StatusMessage
          variant="error"
          title="Kunde inte hämta användare"
          description={error.message}
          onRetry={refetch}
        />
      )}

      {data && users.length === 0 && (
        <StatusMessage
          variant="empty"
          title="Inga användare"
          description="API:et returnerade en tom lista."
          onRetry={refetch}
        />
      )}

      {data && users.length > 0 && (
        <>
          <div className="search">
            <label className="search__label" htmlFor="search">
              Sök användare
            </label>
            <input
              id="search"
              className="search__input"
              type="search"
              value={search}
              placeholder="Namn, användarnamn, stad eller roll"
              onChange={(event) => setSearch(event.target.value)}
            />
            <p className="search__count">
              Visar {visibleUsers.length} av {users.length} användare
            </p>
          </div>

          {visibleUsers.length === 0 ? (
            <StatusMessage
              variant="empty"
              title="Inga träffar"
              description="Prova ett annat sökord."
              action={
                <button
                  type="button"
                  className="button"
                  onClick={() => setSearch('')}
                >
                  Rensa sökning
                </button>
              }
            />
          ) : (
            <ul className="grid">
              {visibleUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}
