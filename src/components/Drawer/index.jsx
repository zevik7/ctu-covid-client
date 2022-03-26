import React from 'react'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { styled } from '@mui/material/styles'
import { mainListItems, secondaryListItems } from '../DrawerItems'

import Logo from '../Logo'

const content = (
  <>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: [1],
      }}
    >
      <Logo
        sx={{
          width: '140px',
        }}
        textVariant="body1"
      />
    </Toolbar>
    <Divider />
    <List component="nav">
      {mainListItems}
      <Divider sx={{ my: 1 }} />
      {secondaryListItems}
    </List>
  </>
)

const MainDrawer = (props) => {
  const { window } = props
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box
      component="nav"
      sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={props.open}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: props.drawerWidth,
          },
        }}
        // PaperProps={{ elevation: 1 }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: props.drawerWidth,
          },
        }}
        open={props.open}
        // PaperProps={{ elevation: 1 }}
      >
        {content}
      </Drawer>
    </Box>
  )
}

export default MainDrawer
