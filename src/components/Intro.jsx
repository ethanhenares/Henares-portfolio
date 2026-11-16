import { useEffect, useState } from 'react'

const HOLD_MS = 2600 // how long the title stays
const FADE_MS = 1000 // how long the fade-out takes

export default function Intro() {
  const [phase, setPhase] = useState('show') // show -> leave -> gone

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => setPhase('leave'), HOLD_MS)
    const t2 = setTimeout(() => {
      setPhase('gone')
      document.body.style.overflow = ''
    }, HOLD_MS + FADE_MS)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      className={`intro ${phase === 'leave' ? 'is-leaving' : ''}`}
      role="status"
      aria-label="kei portfolio"
    >
      <p className="intro-title" aria-hidden="true">
        <span className="intro-word intro-kei">Kei</span>
        <span className="intro-word intro-portfolio">Portfolio</span>
      </p>
      <p className="intro-year" aria-hidden="true">
        2026
      </p>
    </div>
  )
}