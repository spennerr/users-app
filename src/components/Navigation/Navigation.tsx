import { NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../../config/routes'

const NAV_ITEMS = [
  { to: ROUTE_PATHS.overview, label: 'Översikt', end: true },
  { to: ROUTE_PATHS.users, label: 'Användare', end: false },
] as const

export function Navigation() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <span className="nav__brand">Användarportal</span>
        <nav aria-label="Huvudnavigering">
          <ul className="nav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive ? 'nav__link nav__link--active' : 'nav__link'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
