import { Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation/Navigation'
import { OverviewPage } from './pages/OverviewPage'
import { UsersPage } from './pages/UsersPage'
import { UserDetailPage } from './pages/UserDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'

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