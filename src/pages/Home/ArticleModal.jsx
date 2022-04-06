import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'
import parse from 'html-react-parser'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { storeLocation } from '../../api'
import Map from '../../components/Map'
import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'

import { useAuth } from '../../context/Auth/Context'
const LookupModal = (props) => {
  const { data, handleClose } = props

  return (
    <Modal handleClose={handleClose}>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Typography variant="h5">{data.title}</Typography>
          <Typography fontStyle={'italic'} align="right">
            Cập nhật lần cuối vào {dateFormat(data.updated_at, 'dd/mm/yy')}
          </Typography>
          <Divider />
        </Grid>
        <Grid item md={12}>
          {parse(data.content)}
        </Grid>
        <Grid item md={12}>
          <Typography fontStyle={'italic'} align="right">
            Người tạo: {data.created_by.name}
          </Typography>
          <Divider />
        </Grid>
        <Grid item md={12} container justifyContent={'flex-end'}>
          <Button variant="text" onClick={handleClose}>
            Đóng
          </Button>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default LookupModal
