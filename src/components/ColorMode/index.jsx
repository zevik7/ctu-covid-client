import * as React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { viVN } from '@mui/material/locale'

const Context = React.createContext({ toggleColorMode: () => {} })

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
    <Context.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </Context.Provider>
  )
}

// Custom hook
const useColorMode = () => {
  return React.useContext(Context)
}

export default {
  Context,
  Provider,
  useColorMode,
}
