import { socials } from '../data/site.js'

export default function Socials() {
  return (
    <section className="pt-6 pb-12 md:min-h-svh md:pt-12 md:pb-20">
      <h1 className="sr-only">Socials</h1>
      <ul className="group/list text-left sm:text-right">
        {socials.map(({ id, name, handle, url }) => (
          <li key={id}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block pt-[0.4rem] pb-[1.1rem] transition-opacity duration-[400ms] desk:group-focus-within/list:not-focus-visible:opacity-35 desk:group-hover/list:not-hover:opacity-35"
            >
              <span className="display-xl block">{name}</span>
              <span className="mt-[0.2rem] block text-[0.72rem] font-bold">
                {handle} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}