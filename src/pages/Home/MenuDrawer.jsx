import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Drawer from '@mui/material/Drawer'
import SearchIcon from '@mui/icons-material/Search'
import ImageIcon from '@mui/icons-material/Image'

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import Map from '../../components/Map'

import Copyright from '../../components/Copyright'
import Logo from '../../components/Logo'

import { getLocations, destroyLocations } from '../../api'
import { Divider, ListItemButton } from '@mui/material'

import LineChart from '../../components/Chart/LineChart'
import PieChart from '../../components/Chart/PieChart'
import LookupModal from './LookupModal'
import ArticleModal from './ArticleModal'
import PositiveDeclarationModal from './PositiveDeclarationModal'
import RegisterModal from './RegisterModal'
import Chart from 'react-apexcharts'

import { getStats, getPostitiveDeclarations } from '../../api'

export default function MenuDrawer(props) {
  const { open, anchor, onClose } = props

  const MenuItems = () => (
    <>
      <Button
        variant="text"
        // onClick={() => setOpenRegisterModal(true)}
        sx={{ mr: 1 }}
      >
        Tạo thông tin
      </Button>
      <Button
        variant="outlined"
        // onClick={() => setOpenLookupModal(true)}
        sx={{ mr: 1 }}
      >
        Tra cứu <SearchIcon sx={{ ml: 1 }} />
      </Button>
      <Button
        variant="contained"
        // onClick={() => setOpenPositiveDeclarationModal(true)}
        sx={{ mr: 1 }}
      >
        Khai báo F0 <MedicalInformationIcon sx={{ ml: 1, mb: '2px' }} />
      </Button>
    </>
  )

  return (
    <>
      {!open ? (
        <MenuItems />
      ) : (
        <Drawer anchor={anchor} open={open} onClose={onClose}>
          <MenuItems />
        </Drawer>
      )}
    </>
  )
}
