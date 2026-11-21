import { useEffect, useState } from 'react'

const HOLD_MS = 2600 
const FADE_MS = 1000 

export default function Intro() {
  const [phase, setPhase] = useState('show') 

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
      role="status"
      aria-label="kei portfolio"
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#030204] transition-opacity duration-1000 motion-reduce:duration-1000! ${
        phase === 'leave' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <p
        aria-hidden="true"
        className="text-silver flex flex-col items-center font-display leading-[1.05]"
      >
        <span className="animate-reveal -mr-[0.2em] text-[clamp(1.8rem,5vw,3rem)] tracking-[0.2em] opacity-0 blur-[14px] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:blur-none">
          Kei
        </span>
        <span className="animate-reveal text-[clamp(2.2rem,14vw,5rem)] opacity-0 blur-[14px] [animation-delay:450ms] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:blur-none md:text-[clamp(2.8rem,12vw,8rem)]">
          Portfolio
        </span>
      </p>
      <p
        aria-hidden="true"
        className="animate-fade mt-[1.2rem] text-[0.8rem] tracking-[0.4em] text-muted opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
      >
        2026
      </p>
    </div>
  )
}