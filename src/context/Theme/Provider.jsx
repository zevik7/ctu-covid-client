import { useMemo, useState } from 'react'
import MuiThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'
import { viVN } from '@mui/material/locale'
import { ThemeContext } from './Context'

const ThemeProvider = (props) => {
  const [mode, setMode] = useState('light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme(
          {
            palette: {
              mode,
              background: {
                lightBlue: "url('/images/Light-Blue-Wallpapers.jpg')",
              },
            },
          },
          viVN
        )
      ),
    [mode]
  )

  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }