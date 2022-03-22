import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Map from '../../components/Map'

import { updateLocation } from '../../api'
import { Avatar } from '@mui/material'
import Modal from '../../components/Modal'

const ViewModal = (props) => {
  const {
    hideBtns,
    data,
    handleClose,
    handleOpenRelatedUsersModal,
    handleOpenHistoryModal,
  } = props

  return (
    <Modal handleClose={handleClose}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography variant="h6">Thông tin chi tiết</Typography>
        </Grid>
        <Grid item md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              align="center"
              color="primary.light"
            >
              Thông tin người dùng
            </Typography>
            <Avatar
              src={data.user.Avatar}
              sx={{
                width: '100px',
                height: '100px',
              }}
            />
            <Typography variant="subtitle1" component="div" align="center">
              Tên: {data.user.name}
            </Typography>
            <Typography variant="subtitle1" component="div" align="center">
              Số điện thoại: {data.user.phone}
            </Typography>
            <Typography variant="subtitle1" component="div" align="center">
              Email: {data.user.email}
            </Typography>
            <Typography variant="subtitle1" component="div" align="center">
              Địa chỉ: {data.user.address}
            </Typography>
            {!hideBtns && (
              <Button
                variant="contained"
                sx={{
                  m: '0 auto',
                }}
                onClick={() => {
                  handleOpenHistoryModal()
                }}
              >
                Xem lịch sử khai báo
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item md={6}>
          <Typography
            variant="subtitle1"
            component="div"
            align="center"
            color="primary.light"
          >
            Vị trí khai báo trên bản đồ
          </Typography>
          <Typography variant="subtitle1" component="div" align="center">
            {data.location.name}
          </Typography>
          <Map
            style={{
              width: '100%',
              minHeight: '300px',
            }}
            center={[data.location.position.lat, data.location.position.lng]}
            markers={[
              {
                position: data.location.position,
                popup: data.location.name,
              },
            ]}
          />
        </Grid>
        <Grid item md={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pt: 1,
              borderTop: 1,
              borderColor: 'grey.500',
            }}
          >
            {!hideBtns && (
              <Button
                variant="text"
                sx={{
                  mr: 'auto',
                }}
                onClick={() => {
                  handleOpenRelatedUsersModal()
                }}
              >
                Những người khai báo liên quan
              </Button>
            )}
            <Button variant="text" onClick={handleClose}>
              Đóng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ViewModal