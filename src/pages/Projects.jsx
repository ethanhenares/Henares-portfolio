import { useCallback, useState } from 'react'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  const [activeId, setActiveId] = useState(null) // which title is hovered/focused
  const [indexes, setIndexes] = useState({}) // current poster per project id

  const active = projects.find((p) => p.id === activeId)
  const index = active ? (indexes[active.id] ?? 0) : 0

  const handleEnter = useCallback((id) => setActiveId(id), [])
  const handleLeave = useCallback(() => setActiveId(null), [])
  const handleShift = useCallback((id, dir) => {
    const count = projects.find((p) => p.id === id).images.length
    setIndexes((prev) => ({ ...prev, [id]: (((prev[id] ?? 0) + dir) % count + count) % count }))
  }, [])

  return (
    <section className="projects">
      {/* Preview: one stack per project, so each poster is loaded and can crossfade */}
      <div className="previews" aria-hidden="true">
        {projects.map((p) => (
          <div key={p.id} className={`preview ${active?.id === p.id ? 'is-on' : ''}`}>
            {p.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`poster ${i === (indexes[p.id] ?? 0) ? 'is-current' : ''}`}
                draggable="false"
              />
            ))}
            {p.images.length > 1 && (
              <div className="pips">
                {p.images.map((src, i) => (
                  <span key={src} className={i === (indexes[p.id] ?? 0) ? 'pip is-current' : 'pip'} />
                ))}
                <span className="pip-count">
                  {(indexes[p.id] ?? 0) + 1} / {p.images.length}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <h1 className="visually-hidden">Projects</h1>
      <ul className="project-list">
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
      <span className="visually-hidden" aria-live="polite">
        {active && active.images.length > 1 ? `${active.title} poster ${index + 1} of ${active.images.length}` : ''}
      </span>
    </section>
  )
}
