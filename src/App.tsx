import { Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation/Navigation'
import { NotFoundPage } from './pages/NotFoundPage'
import { OverviewPage } from './pages/OverviewPage'
import { UserDetailPage } from './pages/UserDetailPage'
import { UsersPage } from './pages/UsersPage'

export default function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:userId" element={<UserDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
