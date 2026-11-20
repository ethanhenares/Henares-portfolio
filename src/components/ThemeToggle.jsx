import { useEffect, useState } from 'react'

const options = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
]

function readTheme() {
  try {
    const saved = localStorage.getItem('theme')
    return saved === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
    }
  }, [theme])

  return (
    <div className="theme" role="group" aria-label="Theme">
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={theme === id ? 'theme-btn is-on' : 'theme-btn'}
          aria-pressed={theme === id}
          onClick={() => setTheme(id)}
        >
          <span className="box" aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  )
}
