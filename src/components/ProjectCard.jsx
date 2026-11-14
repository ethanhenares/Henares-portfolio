import { useEffect, useRef } from 'react'

const WHEEL_COOLDOWN_MS = 350

// One entry in the right-aligned project list: big title + one-line description.
// With several posters, the mouse wheel (while hovering) or arrow keys (while
// focused) switch which poster is shown in the preview.
export default function ProjectCard({ project, onEnter, onLeave, onShift }) {
  const { title, year, description, images } = project
  const ref = useRef(null)
  const lastWheel = useRef(0)
  const multi = images.length > 1

  useEffect(() => {
    const el = ref.current
    if (!el || !multi) return
    // Native listener: React's onWheel is passive, so it can't stop the page scrolling.
    function onWheel(e) {
      e.preventDefault()
      const now = performance.now()
      if (now - lastWheel.current < WHEEL_COOLDOWN_MS) return
      lastWheel.current = now
      onShift(project.id, e.deltaY > 0 ? 1 : -1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [multi, onShift, project.id])

  function onKeyDown(e) {
    if (!multi) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      onShift(project.id, 1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      onShift(project.id, -1)
    }
  }

  return (
    <li
      ref={ref}
      className="project"
      tabIndex={0}
      onMouseEnter={() => onEnter(project.id)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(project.id)}
      onBlur={onLeave}
      onKeyDown={onKeyDown}
      aria-label={multi ? `${title}, ${images.length} posters. Scroll or use arrow keys to switch.` : title}
    >
      <h2 className="project-title">{title}</h2>
      <p className="project-meta">
        {year} / {description}
      </p>
      {multi && (
        <p className="project-hint" aria-hidden="true">
          {images.length} posters — scroll
        </p>
      )}
    </li>
  )
}
