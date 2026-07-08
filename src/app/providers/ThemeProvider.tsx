import { ReactNode, createContext, useContext } from 'react'

type Theme = 'light'

interface ThemeCtx {
  theme: Theme
}

const ThemeContext = createContext<ThemeCtx>({ theme: 'light' })

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme: 'light' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
