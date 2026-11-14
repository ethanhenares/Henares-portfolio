import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="name" aria-label="kei — home">
        Kei
        <span className="tagline">Graphic Designer</span>
      </Link>
      <nav aria-label="Main navigation">
        <ul className="nav">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
              >
                {/* the active page shows a dot instead of its label */}
                <span className="nav-label">{label}</span>
                <span className="nav-dot" aria-hidden="true" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
