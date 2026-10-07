import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import type { User } from '../types/user'
import { StatusMessage } from '../components/StateViews/StatusMessage'
import { UserList } from '../components/Users/UserList'
import { SearchField } from '../components/Users/SearchField'

function matchesQuery(user: User, query: string): boolean {
  if (!query) return true

  const haystack = [
    user.profile.name,
    user.username,
    user.profile.address.city,
    user.profile.email,
    ...user.roles,
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query.toLowerCase())
}

export function UsersPage() {
  const { data, isPending, isError, error, refetch, isFetching } = useUsers()
  const [search, setSearch] = useState('')

  const users = data ?? []
  const visibleUsers = users.filter((user) => matchesQuery(user, search))

  return (
    <section className="page">
      <header className="page__header">
        <h1>Användare</h1>
        <p>
          Data hämtas från <code>api-userapi.onrender.com</code> och cachas med
          TanStack Query för att skydda API:ets gräns på 100 anrop per dag.
        </p>
      </header>

      {isPending && (
        <StatusMessage
          variant="loading"
          title="Hämtar användare"
          description="Anropar API:et för att hämta användardata."
        />
      )}

      {isError && (
        <StatusMessage
          variant="error"
          title="Kunde inte hämta användare"
          description={
            error instanceof Error
              ? error.message
              : 'Ett okänt fel inträffade under hämtningen.'
          }
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

      {data && users.length === 0 && (
        <StatusMessage
          variant="empty"
          title="Inga användare tillgängliga"
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

      {data && users.length > 0 && (
        <>
          <SearchField
            value={search}
            onChange={setSearch}
            resultCount={visibleUsers.length}
            totalCount={users.length}
          />

          {visibleUsers.length === 0 ? (
            <StatusMessage
              variant="empty"
              title="Inga användare matchar din sökning"
              description="Prova ett annat sökord eller rensa filtret."
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
            <UserList users={visibleUsers} />
          )}
        </>
      )}

      {isFetching && !isPending && (
        <p className="page__hint" role="status">
          Uppdaterar data i bakgrunden…
        </p>
      )}
    </section>
  )
}