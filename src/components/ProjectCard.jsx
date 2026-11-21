import { useEffect, useRef, useState } from 'react'

const WHEEL_COOLDOWN_MS = 350

export default function ProjectCard({ project, onEnter, onLeave, onShift }) {
  const { id, title, year, description, images } = project
  const ref = useRef(null)
  const lastWheel = useRef(0)
  const [slide, setSlide] = useState(0)
  const multi = images.length > 1

  useEffect(() => {
    const el = ref.current
    if (!el || !multi) return
    function onWheel(e) {
      e.preventDefault()
      const now = performance.now()
      if (now - lastWheel.current < WHEEL_COOLDOWN_MS) return
      lastWheel.current = now
      onShift(id, e.deltaY > 0 ? 1 : -1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [multi, onShift, id])

  function onKeyDown(e) {
    if (!multi) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      onShift(id, 1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      onShift(id, -1)
    }
  }

  return (
    <li
      ref={ref}
      tabIndex={0}
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(id)}
      onBlur={onLeave}
      onKeyDown={onKeyDown}
      aria-label={multi ? `${title}, ${images.length} posters. Scroll or use arrow keys to switch.` : title}
      className="cursor-default pt-[0.4rem] pb-8 outline-offset-[6px] transition-opacity duration-[400ms] desk:pb-[1.1rem] desk:group-focus-within/list:not-focus:opacity-35 desk:group-hover/list:not-hover:opacity-35"
    >
      {/* Swipeable posters: shown everywhere except mouse + wide screens */}
      <div className="mb-[0.9rem] desk:hidden">
        <div
          onScroll={(e) => {
            const el = e.currentTarget
            setSlide(Math.round(el.scrollLeft / el.clientWidth))
          }}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map(({ src, alt }) => (
            <img
              key={src}
              src={src}
              alt={alt}
              loading="lazy"
              draggable="false"
              className="mask-poster aspect-[846/525] w-full flex-none snap-center object-contain select-none"
            />
          ))}
        </div>
        {multi && (
          <p aria-hidden="true" className="mt-[0.3rem] text-center text-[0.68rem] font-bold tracking-[0.1em]">
            {slide + 1} / {images.length}
          </p>
        )}
      </div>

      <h2 className="display-xl font-normal">{title}</h2>
      <p className="mt-[0.2rem] max-w-[46ch] text-[0.72rem] leading-normal font-bold sm:ml-auto">
        {year} / {description}
      </p>
      {multi && (
        <p aria-hidden="true" className="mt-[0.35rem] text-[0.65rem] tracking-[0.18em] text-muted uppercase">
          {images.length} posters — <span className="hidden desk:inline">scroll</span>
          <span className="desk:hidden">swipe</span>
        </p>
      )}
    </li>
  )
}