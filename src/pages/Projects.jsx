import { useCallback, useState } from 'react'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  const [activeId, setActiveId] = useState(null)
  const [indexes, setIndexes] = useState({}) 

  const active = projects.find((p) => p.id === activeId)
  const indexOf = (id) => indexes[id] ?? 0

  const handleEnter = useCallback((id) => setActiveId(id), [])
  const handleLeave = useCallback(() => setActiveId(null), [])
  const handleShift = useCallback((id, dir) => {
    const count = projects.find((p) => p.id === id).images.length
    setIndexes((prev) => ({ ...prev, [id]: ((((prev[id] ?? 0) + dir) % count) + count) % count }))
  }, [])

  return (
    <section className="pt-6 pb-12 md:min-h-svh md:pt-12 md:pb-20">
      {/* Mouse + wide screens: the poster of the hovered title floats beside the list */}
      <div className="pointer-events-none fixed top-1/2 left-[18vw] -z-10 hidden aspect-[846/525] w-[min(36vw,560px)] -translate-y-1/2 desk:block">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`absolute inset-0 transition duration-500 ${
              active?.id === p.id ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-0'
            }`}
          >
            {p.images.map(({ src, alt }, i) => (
              <img
                key={src}
                src={src}
                alt={alt}
                draggable="false"
                className={`mask-poster absolute inset-0 size-full object-contain transition-opacity duration-[450ms] select-none ${
                  i === indexOf(p.id) ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            {p.images.length > 1 && (
              <div aria-hidden="true" className="absolute inset-x-0 -bottom-[2.2rem] flex items-center justify-center gap-2">
                {p.images.map(({ src }, i) => (
                  <span
                    key={src}
                    className={`size-[6px] rounded-full border transition duration-300 ${
                      i === indexOf(p.id)
                        ? 'border-red bg-red opacity-100 shadow-[0_0_8px_var(--color-red)]'
                        : 'border-ink opacity-50'
                    }`}
                  />
                ))}
                <span className="ml-2 text-[0.68rem] font-bold tracking-[0.1em]">
                  {indexOf(p.id) + 1} / {p.images.length}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <h1 className="sr-only">Projects</h1>
      <ul className="group/list ml-auto max-w-[640px] text-left sm:text-right desk:max-w-none">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onEnter={handleEnter}
            onLeave={handleLeave}
            onShift={handleShift}
          />
        ))}
      </ul>

      <span className="sr-only" aria-live="polite">
        {active && active.images.length > 1
          ? `${active.title} poster ${indexOf(active.id) + 1} of ${active.images.length}`
          : ''}
      </span>
    </section>
  )
}