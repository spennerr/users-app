import { useState } from 'react'
import { StatusMessage } from '../components/StateViews/StatusMessage'
import { SearchField } from '../components/Users/SearchField'
import { UserCard } from '../components/Users/UserCard'
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
          title="Inga användare"
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
