import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

import DoneOutlineIcon from '@mui/icons-material/DoneOutline'

import Modal from '../../components/Modal'
import Map from '../../components/Map'

import { getPostitiveDeclarations } from '../../api'
import { Alert } from '@mui/material'

const InjectionModal = (props) => {
  const { user, handleClose } = props

  const [posDecla, setPosDecla] = useState([])

  useEffect(() => {
    getPostitiveDeclarations({
      'user._id': user._id,
    })
      .then((rs) => {
        setPosDecla(rs.data.data)
        console.log(rs.data.data)
        console.log('rs.data.data')
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
            Thông tin khai báo ca nhiễm
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography fontStyle="italic">Danh sách các lần khai báo</Typography>
        </Grid>
        {posDecla.map((pos, i) => (
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
                Ngày dương tính: {dateFormat(pos.start_date, 'dd/mm/yy')}
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Typography>
                Ngày khỏi: {dateFormat(pos.end_date, 'dd/mm/yy') || '---'}
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Typography>
                Ngày khai báo: {dateFormat(pos.created_at, 'dd/mm/yy')}
              </Typography>
            </Grid>
          </Grid>
        ))}

        {!posDecla.length && (
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
