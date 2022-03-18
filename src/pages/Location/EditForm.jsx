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
import QRCode from 'qrcode.react'

const downloadQR = (id) => {
  const svg = document.getElementById(id)
  let data = new XMLSerializer().serializeToString(svg)
  let svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
  let url = URL.createObjectURL(svgBlob)
  // Create a element to download
  let a = document.createElement('a')

  a.setAttribute('download', 'image.svg')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')

  a.click()
}

const EditForm = (props) => {
  const { data, handleClose } = props

  const _id = data._id

  const [successAlert, setSuccessAlert] = useState(false)

  const [form, setForm] = useState({
    name: {
      value: data.name,
      error: false,
    },
    position: { lat: data.position.lat, lng: data.position.lng },
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.value) {
      setForm({ ...form, name: { ...form.name, error: true } })
      return
    }

    updateLocation(
      {
        _id,
      },
      {
        name: form.name.value,
        position: form.position,
      }
    )
      .then(() => {
        setSuccessAlert(true)
      })
      .catch((err) => console.log(err))
  }

  const handleMapClick = (e) => {
    setForm({ ...form, position: e.latlng })
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    let error = false

    if (!value) error = true
    setForm({ ...form, name: { value, error } })
  }

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Typography variant="h6">Thông tin chi tiết</Typography>
          </Grid>
          <Grid item md={6}>
            {successAlert && <Alert severity="success">Lưu thành công</Alert>}
          </Grid>
          <Grid item md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="subtitle1" component="div" align="center">
                Mã QR
              </Typography>
              <QRCode
                id={_id + 'QR'}
                renderAs="svg"
                value={_id}
                size={200}
                imageSettings={{
                  src: '/logo.png',
                  x: null,
                  y: null,
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
              <Button variant="text" onClick={() => downloadQR(_id + 'QR')}>
                Tải mã QR
              </Button>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Typography variant="subtitle1" component="div" align="center">
              Vị trí trên bản đồ
            </Typography>
            <Map
              style={{
                width: '100%',
                minHeight: '300px',
              }}
              zoom={20}
              handleClick={handleMapClick}
              center={[form.position.lat, form.position.lng]}
              makers={[
                {
                  position: form.position,
                  popup: form.name,
                },
              ]}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Địa chỉ"
              name="name"
              autoComplete="name"
              autoFocus
              sx={{
                mb: '8px',
              }}
              value={form.name.value}
              onChange={handleNameChange}
              error={form.name.error}
              helperText={form.name.error && 'Vui lòng nhập trường này'}
            />
          </Grid>
          <Grid item md={6}>
            <Typography>Người tạo: {data.created_by.name}</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>Email: {data.created_by.email}</Typography>
          </Grid>
          <Grid item md={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mr: 2,
                }}
              >
                Lưu
              </Button>
              <Button variant="text" onClick={handleClose}>
                Đóng
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default EditForm