export default function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="bg-glow animate-drift fixed inset-0 -z-10 bg-bg after:absolute after:inset-0 after:bg-grain after:opacity-[0.16] after:mix-blend-overlay after:content-['']"
    />
  )
}