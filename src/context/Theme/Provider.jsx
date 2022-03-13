import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { viVN } from '@mui/material/locale'
import { ThemeContext } from './Context'

const Provider = (props) => {
  const [mode, setMode] = React.useState('light')

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode,
          },
        },
        viVN
      ),
    [mode]
  )

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default Provider
