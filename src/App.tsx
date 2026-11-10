import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { OverviewPage } from './pages/OverviewPage'
import { UserDetailPage } from './pages/UserDetailPage'
import { UsersPage } from './pages/UsersPage'

function NotFound() {
  return (
    <section className="page">
      <h1>Sidan hittades inte</h1>
      <Link className="button" to="/">
        Till översikten
      </Link>
    </section>
  )
}

export default function App() {
  return (
    <div className="app">
      <header className="nav">
        <div className="nav__inner">
          <span className="nav__brand">Användarportal</span>
          <nav className="nav__list" aria-label="Huvudnavigering">
            <NavLink className="nav__link" to="/" end>
              Översikt
            </NavLink>
            <NavLink className="nav__link" to="/users">
              Användare
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="app__main">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:userId" element={<UserDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
