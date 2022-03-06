import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import Radio from '@mui/material/Radio'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Copyright from '../../components/Copyright'
import Logo from '../../components/Logo'
import { useAuth } from '../../components/Auth/Context'
import { updateUser, storeUser } from '../../api'

import { Container } from '@mui/material'

import dateFormat from 'dateformat'

const ModalForm = (props) => {
  const { data, handleClose } = props

  // edit or add method
  const _id = data._id

  const [successAlert, setSuccessAlert] = useState(false)

  const [form, setForm] = useState({
    user: {
      name: data?.user?.name,
      phone: data?.user?.phone,
      email: data?.user?.email,
      avtar: data?.user?.avatar,
    },
    vaccine_type: {
      _id: data?.vaccine_type?._id,
      name: data?.vaccine_type?.name,
    },
    injection_date: data?.injection_date,
    images: data?.images,
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    let error = false
    let errorTxt = ''

    if (!value) {
      error = true
      errorTxt = 'Yêu cầu nhập trường này'
    } else {
      switch (name) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = true
            errorTxt = 'Email không hợp lệ'
          }
          break
        case 'phone':
          const regex =
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
          if (!regex.test(value)) {
            error = true
            errorTxt = 'Số điện thoại không hợp lệ'
          }
          break
        default:
          break
      }
    }

    setForm({ ...form, [name]: { value, error, errorTxt } })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isError = Object.keys(form).find((key, index) => form[key].error)

    if (isError) return

    const data = new FormData(event.currentTarget)

    // Call api
    if (_id) {
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
    } else {
      // Add action
      storeUser(data)
        .then((rs) => {
          setSuccessAlert(!successAlert)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      <Typography variant="h5" mb={2}>
        Thông tin chi tiết
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Avatar
                sx={{
                  width: '100%',
                  height: '100%',
                }}
                variant="square"
                src={process.env.REACT_APP_SERVER + data.avatar}
              />
              <Button
                variant="outlined"
                sx={{
                  marginTop: 2,
                }}
              >
                {_id ? 'Thay đổi' : 'Thêm'}
              </Button>
            </Box>
          </Grid>
          <Grid item md={9}>
            <TextField
              required
              fullWidth
              id="name"
              label="Họ tên"
              name="name"
              autoComplete="name"
              autoFocus
              sx={{
                mb: '8px',
              }}
              value={form.name.value}
              onChange={(e) => handleInput(e)}
              error={form.name.error}
              helperText={form.name.errorTxt}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '16px 0 8px 0',
              }}
            >
              <TextField
                id="birthday"
                label="Ngày sinh"
                type="date"
                name="birthday"
                sx={{ mr: 2, width: 200 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={dateFormat(form.birthday.value, 'yyyy-mm-dd')}
                onChange={(e) => handleInput(e)}
                error={form.birthday.error}
                helperText={form.birthday.errorTxt}
              />
              <RadioGroup
                row
                value={form.gender.value === 'Nam' ? 'Nam' : 'Nữ'}
                name="gender"
                onChange={(e) => handleInput(e)}
              >
                <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
              </RadioGroup>
            </Box>
            <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              label="Email"
              name="email"
              value={form.email.value}
              onChange={(e) => handleInput(e)}
              error={form.email.error}
              helperText={form.email.errorTxt}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="phone"
              label="Số điện thoại"
              name="phone"
              value={form.phone.value}
              onChange={(e) => handleInput(e)}
              error={form.phone.error}
              helperText={form.phone.errorTxt}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="address"
              label="Địa chỉ"
              name="address"
              value={form.address.value}
              onChange={(e) => handleInput(e)}
              error={form.address.error}
              helperText={form.address.errorTxt}
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
              >
                {_id ? 'Lưu' : 'Thêm'}
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

export default ModalForm
