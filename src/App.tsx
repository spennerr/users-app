import { Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation/Navigation'
import { ROUTE_PATHS } from './config/routes'
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
          <Route path={ROUTE_PATHS.overview} element={<OverviewPage />} />
          <Route path={ROUTE_PATHS.users} element={<UsersPage />} />
          <Route path={ROUTE_PATHS.userDetail} element={<UserDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
