import { useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

import { useAuth } from '../../context/Auth'

import SettingModal from './SettingModal'
import AlertDialog from '../AlertDialog'

export default function AccountMenu() {
  const { user, onLogout } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openSettingModal, setOpenSettingModal] = useState(false)
  const [infoAlertTxt, setInfoAlertTxt] = useState('')

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenSettingModal = () => setOpenSettingModal(true)

  const handleCloseSettingModal = () => setOpenSettingModal(false)

  return (
    <>
      {infoAlertTxt && (
        <AlertDialog
          text={infoAlertTxt}
          handleClose={() => setInfoAlertTxt('')}
          severity="info"
        />
      )}
      {openSettingModal && (
        <SettingModal handleClose={handleCloseSettingModal} />
      )}
      <IconButton
        onClick={handleClick}
        size="medium"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          sx={{ width: 36, height: 36 }}
          src={`${process.env.REACT_APP_SERVER}${user.avatar}`}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0.5,
            '& .MuiAvatar-root': {
              width: 20,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenSettingModal}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt tài khoản
        </MenuItem>
        <MenuItem
          onClick={() => setInfoAlertTxt('Vui lòng liên hệ quản trị viên')}
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Thêm tài khoản
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  )
}
