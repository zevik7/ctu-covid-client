import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import { updateUser, storeUser } from '../../api'

const EditForm = (props) => {
  const { data, handleClose, handleSetEditFormData } = props

  const [successAlert, setSuccessAlert] = useState(false)

  const _id = data._id

  const [form, setForm] = useState({
    user_id: data.user._id,
    user_name: data.user.name,
    user_phone: data.user.phone,
    user_email: data.user.email,
    vaccine_type_id: data.vaccine_type._id,
    vaccine_type_name: data.vaccine_type.name,
    injection_date: data.injection_date,
    images: data.images,
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isError = Object.keys(form).find((key, index) => form[key].error)

    if (isError) return

    const data = new FormData(event.currentTarget)

    // Edit action
    updateUser(
      {
        _id,
      },
      data
    )
      .then(() => {
        setSuccessAlert(!successAlert)
      })
      .catch((err) => console.log(err))

    handleSetEditFormData({})
  }

  return (
    <>
      <Typography variant="h5" mb={2}>
        Thông tin chi tiết
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              required
              fullWidth
              disabled
              id="user_name"
              label="Họ tên"
              name="user_name"
              autoComplete="user_name"
              autoFocus
              value={form.user_name}
              onChange={(e) => handleInput(e)}
              sx={{
                marginRight: '10px',
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              required
              fullWidth
              disabled
              id="user_phone"
              label="Số điện thoại"
              name="user_phone"
              autoComplete="user_phone"
              autoFocus
              value={form.user_phone}
              onChange={(e) => handleInput(e)}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              required
              fullWidth
              disabled
              id="user_email"
              label="Email"
              name="user_email"
              value={form.user_email}
              onChange={(e) => handleInput(e)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              required
              fullWidth
              id="vaccine_type_name"
              label="Loại vắc-xin"
              name="vaccine_type_name"
              value={form.vaccine_type_name}
              onChange={(e) => handleInput(e)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              id="injection_date"
              label="Ngày tiêm"
              type="date"
              name="injection_date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateFormat(form.injection_date, 'yyyy-mm-dd')}
              onChange={(e) => handleInput(e)}
            />
          </Grid>

          {form.images &&
            form.images.map((image, index) => (
              <Grid item lg={6} key={index}>
                <Avatar
                  variant="square"
                  sx={{ mr: 2, width: '100%', height: '100%' }}
                  src={process.env.REACT_APP_SERVER + image.url}
                />
              </Grid>
            ))}

          <Grid item md={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  mr: 'auto',
                }}
              >
                Thay đổi ảnh
              </Button>
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
            {successAlert && <Alert severity="success">Lưu thành công</Alert>}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default EditForm
