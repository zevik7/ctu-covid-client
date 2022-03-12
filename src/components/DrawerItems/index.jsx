import * as React from 'react'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import ShareLocationIcon from '@mui/icons-material/ShareLocation'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import Box from '@mui/material/Box'
import NotificationsIcon from '@mui/icons-material/Notifications'

import { Link as RouterLink, useResolvedPath, useMatch } from 'react-router-dom'

import './style.module.scss'

const LinkItem = (props) => {
  let resolved = useResolvedPath(props.to)
  let match = useMatch({ path: resolved.pathname, end: true })

  return (
    <RouterLink
      to={props.to}
      style={{
        color: 'inherit',
        textDecoration: 'inherit',
      }}
    >
      <ListItemButton selected={Boolean(match)}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </RouterLink>
  )
}

export const mainListItems = (
  <Box>
    <LinkItem to="/admin" icon={<DashboardIcon />} text="Trang chủ" />
    <LinkItem
      to="/admin/user"
      icon={<PeopleIcon />}
      text="Quản lý người dùng"
    />
    <LinkItem
      to="/admin/location"
      icon={<ShareLocationIcon />}
      text="Địa điểm khai báo"
    />
    <LinkItem
      to="/admin/declaration"
      icon={<HistoryEduIcon />}
      text="Lịch sử khai báo"
    />
    <LinkItem
      to="/admin/injection"
      icon={<HealthAndSafetyIcon />}
      text="Thông tin tiêm chủng"
    />
    <LinkItem
      to="/admin/vaccine-type"
      icon={<VaccinesIcon />}
      text="Thông tin vắc-xin"
    />
    <LinkItem
      to="/admin/notification"
      icon={<NotificationsIcon />}
      text="Quản lý thông báo"
    />
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
