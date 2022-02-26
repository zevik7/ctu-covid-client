import * as React from 'react'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ShareLocationIcon from '@mui/icons-material/ShareLocation'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

import { Link as RouterLink } from 'react-router-dom'

import './style.module.scss'

const LinkItem = (props) => (
  <RouterLink
    to={props.to}
    style={{
      color: 'inherit',
      textDecoration: 'inherit',
    }}
  >
    <ListItemButton>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItemButton>
  </RouterLink>
)

export const mainListItems = (
  <Box>
    <LinkItem to="/admin" icon={<DashboardIcon />} text="Trang chủ" />
    <LinkItem to="/admin/user" icon={<PeopleIcon />} text="Người dùng" />
    <LinkItem
      to="/admin/location"
      icon={<ShareLocationIcon />}
      text="Địa điểm"
    />
    <LinkItem
      to="/admin/declaration"
      icon={<HistoryEduIcon />}
      text="Tra cứu lịch sử khai báo"
    />
    <LinkItem
      to="/admin/injection"
      icon={<HealthAndSafetyIcon />}
      text="Tiêm chủng"
    />
    <LinkItem to="/admin/vaccine-type" icon={<VaccinesIcon />} text="Vắc xin" />
  </Box>
)

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Khác
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
)