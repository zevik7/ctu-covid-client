import { useState, useEffect } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { storeLocation } from '../../api'
import Map from '../../components/Map'
import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'

import { useAuth } from '../../context/Auth/Context'

const LookupModal = (props) => {
  const { handleClose, updateRows } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

  const [form, setForm] = useState({
    name: {
      value: '',
      error: false,
    },
    position: { lat: 10.030775863927552, lng: 105.77155012533245 },
  })

  const handleNameChange = (e) => {
    const value = e.target.value
    let error = false

    if (!value) error = true
    setForm({ ...form, name: { value, error } })
    setEnableSubmitBtn(true)
  }

  const handleMapClick = (e) => {
    setForm({ ...form, position: e.latlng })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.value) {
      setForm({ ...form, name: { ...form.name, error: true } })
      return
    }

    storeLocation({
      name: form.name.value,
      // created_by: {
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
      // },
      position: form.position,
    })
      .then(() => {
        setSuccessAlert(true)
        setEnableSubmitBtn(false)
        updateRows()
      })
      .catch((err) => console.log(err))
  }

  return (
    <Modal handleClose={handleClose}>
      {successAlert && (
        <AlertDialog
          text={'Thêm thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      <Typography variant="h6" mb={1}>
        Thêm địa điểm khai báo mới
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="name"
              label="Địa chỉ"
              name="name"
              autoComplete="name"
              autoFocus
              margin="normal"
              value={form.name.value}
              onChange={handleNameChange}
              error={form.name.error}
              helperText={form.name.error && 'Vui lòng nhập trường này'}
            />
            <Typography variant="subtitle1" gutterBottom component="div">
              Chọn vị trí trên bản đồ
            </Typography>
            <Map
              style={{
                minWidth: '300px',
                minHeight: '300px',
              }}
              handleClick={handleMapClick}
              markers={[
                {
                  position: form.position,
                  popup: form.name.value,
                },
              ]}
            />
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
                disabled={!enableSubmitBtn}
              >
                Thêm
              </Button>
              <Button variant="text" onClick={handleClose}>
                Đóng
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default LookupModal
