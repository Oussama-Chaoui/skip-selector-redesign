import { useState, useLayoutEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import TimelineDesign from './designs/timeline'

const THEME_KEY = 'theme' as const
type Theme = 'light' | 'dark'

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useLayoutEffect(() => {
    const root = document.documentElement

    root.style.transition = 'background-color .5s ease, color .5s ease'

    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')

    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <div className="min-h-screen w-full bg-background text-text">
      <TimelineDesign />

      <div
        className="fixed bottom-2 left-4 sm:bottom-auto sm:left-auto sm:top-4 sm:right-4 z-[1000]">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-3 rounded-full shadow-lg bg-card-light dark:bg-card-dark hover:opacity-90"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </div>
  )
}
