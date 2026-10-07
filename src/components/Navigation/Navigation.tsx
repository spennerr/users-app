import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Översikt' },
  { to: '/users', label: 'Användare' },
] as const

export function Navigation() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <span className="nav__brand">Users App</span>
        <nav aria-label="Huvudnavigering">
          <ul className="nav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
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