import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/socials', label: 'Socials' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="px-5 pt-5 md:fixed md:top-0 md:left-0 md:z-5 md:px-10 md:py-8">
      <Link
        to="/"
        aria-label="kei — home"
        className="text-silver block w-fit font-display text-[clamp(2.4rem,11vw,3.4rem)] leading-none font-normal tracking-[0.02em] md:text-[clamp(2.8rem,5vw,4.4rem)]"
      >
        Kei
        <span className="mt-[0.6rem] block text-[0.8rem] font-medium tracking-normal">
          Graphic Designer
        </span>
      </Link>

      <nav aria-label="Main navigation">
        <ul className="mt-5 flex flex-wrap gap-x-[1.4rem] md:mt-[2.8rem] md:block">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className="group relative block py-[0.7rem] text-[0.85rem] leading-[1.4] font-bold md:py-[0.28rem] md:text-[0.8rem]"
              >
                {({ isActive }) => (
                  <>
                    {/* on wide screens the active page swaps its label for a dot */}
                    <span
                      className={`transition-opacity duration-300 group-hover:opacity-55 ${
                        isActive ? 'md:opacity-0 md:group-hover:opacity-0' : ''
                      }`}
                    >
                      {label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-[0.15rem] left-1/2 -ml-[3px] size-[7px] rounded-full bg-red shadow-[0_0_10px_var(--color-red)] transition duration-300 md:top-1/2 md:bottom-auto md:left-0 md:-mt-[3px] md:ml-0 ${
                        isActive ? 'scale-100 opacity-100' : 'scale-[0.4] opacity-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}