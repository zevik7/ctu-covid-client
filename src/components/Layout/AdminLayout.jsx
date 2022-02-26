import * as React from 'react'
import { Outlet } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import AppBar from '../AppBar'
import Copyright from '../Copyright'
import Drawer from '../Drawer'

const mdTheme = createTheme()

const drawerWidth = 240

function AdminLayoutContent() {
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
        <Drawer open={openDrawer} drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Outlet />
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default function AdminLayout() {
  return <AdminLayoutContent />
}
