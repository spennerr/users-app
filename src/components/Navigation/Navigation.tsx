import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav__link nav__link--active' : 'nav__link'

export function Navigation() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <span className="nav__brand">Användarportal</span>
        <nav aria-label="Huvudnavigering">
          <ul className="nav__list">
            <li>
              <NavLink to="/" end className={linkClass}>
                Översikt
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className={linkClass}>
                Användare
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
