import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Copyright from '../../components/Copyright'

const theme = createTheme()

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            Website hỗ trợ phòng chống covid-19 CTU-Covid với MERN Stack
          </Typography>
        </Toolbar>
        <main></main>
      </Container>
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Copyright />
      </Box>
    </ThemeProvider>
  )
}
