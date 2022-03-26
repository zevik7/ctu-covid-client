import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/material/styles'

import AppBar from '../AppBar'
import Copyright from '../Copyright'
import Drawer from '../Drawer'

const drawerWidth = 240

function AdminLayoutContent() {
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline enableColorScheme />
      <AppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Drawer
        open={openDrawer}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Outlet />
        <Copyright />
      </Box>
    </Box>
  )
}

export default function AdminLayout() {
  return <AdminLayoutContent />
}
