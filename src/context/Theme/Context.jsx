import { createContext, useContext } from 'react'

const ThemeContext = createContext(null)

// Custom hook
const useTheme = () => {
  return useContext(ThemeContext)
}

export { ThemeContext, useTheme }
