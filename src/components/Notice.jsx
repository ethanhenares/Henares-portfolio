export default function Notice({ tone = 'info', children, ...props }) {
  const color = tone === 'error' ? 'border-red bg-red/18' : 'border-ink'
  return (
    <p
      className={`mt-6 border px-5 py-4 text-[0.85rem] [&_a]:underline [&_a]:underline-offset-4 [&_code]:text-[0.85em] ${color}`}
      {...props}
    >
      {children}
    </p>
  )
}