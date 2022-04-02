import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import DoneOutlineIcon from '@mui/icons-material/DoneOutline'

import Modal from '../../../components/Modal'

import { Alert } from '@mui/material'
import { lookupInjection } from '../../../api'

const InjectionModal = (props) => {
  const { user, handleClose } = props

  const [injections, setInjections] = useState([])

  useEffect(() => {
    lookupInjection({
      'user._id': user._id,
    })
      .then((rs) => {
        setInjections(rs.data.data)
      })
      .catch((error) => console.log(error.response))
  }, [])

  return (
    <Modal
      handleClose={handleClose}
      sx={{
        width: {
          lg: '60%',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Thông tin tiêm chủng người dùng
          </Typography>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          {(injections.length > 1 && (
            <Alert
              severity="success"
              icon={<DoneOutlineIcon />}
              variant="filled"
              children={
                <Typography align="center" variant="h6">
                  Bạn đã tiêm đủ liều
                </Typography>
              }
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            />
          )) || (
            <Alert
              severity="warning"
              variant="filled"
              children={
                <Typography align="center" variant="h6">
                  Bạn chưa tiêm đủ liều
                </Typography>
              }
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography fontStyle="italic">Danh sách các lần tiêm</Typography>
        </Grid>
        {injections.map((injection, i) => (
          <Grid
            item
            xs={12}
            container
            spacing={1}
            justifyContent="space-evenly"
          >
            <Grid item xs="auto">
              <Typography>Lần {i + 1}</Typography>
            </Grid>
            <Grid item xs="auto">
              <Typography>
                Loại vắc-xin: {injection.vaccine_type.name}
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Typography>
                Ngày tiêm: {dateFormat(injection.injection_date, 'dd/mm/yy')}
              </Typography>
            </Grid>
          </Grid>
        ))}

        {!injections.length && (
          <Grid item xs={12}>
            <Typography align="center" sx={{ fontStyle: 'italic' }}>
              Không có dữ liệu
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="text" onClick={handleClose}>
              Đóng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default InjectionModal
