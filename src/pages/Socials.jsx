import { socials } from '../data/site.js'

export default function Socials() {
  return (
    <section className="socials">
      <h1 className="visually-hidden">Socials</h1>
      <ul className="social-list">
        {socials.map((s) => (
          <li key={s.id} className="social">
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-name">{s.name}</span>
              <span className="social-handle">
                {s.handle} <span aria-hidden="true">↗</span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}