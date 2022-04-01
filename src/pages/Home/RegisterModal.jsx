import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { styled } from '@mui/material/styles'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { storeUserProfile } from '../../api'

import dateFormat from 'dateformat'

const Input = styled('input')({
  display: 'none',
})

const validateField = (name, value) => {
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
  return { error, errorTxt }
}

const RegisterModal = (props) => {
  const { handleClose } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [errAlertTxt, setErrAlertTxt] = useState('')
  const [avatarUpload, setAvatarUpload] = useState(null)
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

  const [form, setForm] = useState({
    name: { value: '', error: false, errorTxt: '' },
    birthday: {
      value: new Date().setFullYear(2000),
      error: false,
      errorTxt: '',
    },
    gender: { value: 'Nam', error: false, errorTxt: '' },
    email: { value: '', error: false, errorTxt: '' },
    phone: { value: '', error: false, errorTxt: '' },
    address: { value: '', error: false, errorTxt: '' },
    avatar: {
      value: '/images/default_avatar.jpeg',
      error: false,
      errorTxt: '',
    },
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    const { error, errorTxt } = validateField(name, value)

    setForm({ ...form, [name]: { value, error, errorTxt } })
    setEnableSubmitBtn(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const isEmpty = Object.keys(form).find((key, index) => !form[key].value)

    if (isEmpty) {
      setErrAlertTxt('Vui lòng nhập tất cả các trường')
      return
    }

    const data = new FormData(event.currentTarget)

    try {
      await storeUserProfile(data)
      setSuccessAlert(true)
      setEnableSubmitBtn(false)
    } catch (errors) {
      const errorsData = errors?.response?.data

      if (errorsData && errorsData.type === 'validation' && errorsData.errors) {
        if (errorsData.errors.email) {
          setForm((form) => ({
            ...form,
            email: {
              ...form.email,
              error: true,
              errorTxt: errorsData.errors.email,
            },
          }))
        }

        if (errorsData.errors.phone)
          setForm((form) => ({
            ...form,
            phone: {
              ...form.phone,
              error: true,
              errorTxt: errorsData.errors.phone,
            },
          }))
      }
    }
  }

  const handleChangeAvatar = (e) => {
    if (e.target.files && e.target.files[0]) {
      let avatar = e.target.files[0]
      setAvatarUpload(URL.createObjectURL(avatar))
    }
  }

  return (
    <Modal handleClose={handleClose}>
      {successAlert && (
        <AlertDialog
          title="Thông báo"
          text={'Tạo thông tin thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      {errAlertTxt && (
        <AlertDialog
          title="Thông báo"
          text={errAlertTxt}
          severity="error"
          handleClose={() => setErrAlertTxt(false)}
        />
      )}
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6">Tạo thông tin người dùng</Typography>
          </Grid>
          <Grid
            container
            item
            xs={8}
            lg={5}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={
                avatarUpload
                  ? avatarUpload
                  : process.env.REACT_APP_SERVER + form.avatar.value
              }
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'contain',
                border: 1,
                borderColor: 'primary.light',
              }}
              variant="square"
            />
            <label htmlFor="contained-button-file">
              <Input
                name="avatar"
                accept="image/*"
                id="contained-button-file"
                type="file"
                sx={{
                  display: 'none',
                }}
                onChange={handleChangeAvatar}
              />
              <Button
                variant="outlined"
                component="span"
                sx={{
                  marginTop: 1,
                }}
              >
                Thay đổi
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} lg={7}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="name"
              label="Họ tên"
              name="name"
              autoComplete="name"
              autoFocus
              value={form.name.value}
              onChange={(e) => handleInput(e)}
              error={form.name.error}
              helperText={form.name.errorTxt}
            />

            <TextField
              required
              fullWidth
              margin="normal"
              id="birthday"
              label="Ngày sinh"
              type="date"
              name="birthday"
              sx={{ minWidth: 150 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={dateFormat(form.birthday.value, 'yyyy-mm-dd')}
              onChange={(e) => handleInput(e)}
              error={form.birthday.error}
              helperText={form.birthday.errorTxt}
            />
            <FormControl
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <FormLabel
                id="gender-radio-buttons-group-label"
                sx={{
                  mr: 2,
                }}
              >
                Giới tính
              </FormLabel>
              <RadioGroup
                row
                value={form.gender.value === 'Nam' ? 'Nam' : 'Nữ'}
                name="gender"
                onChange={(e) => handleInput(e)}
                aria-labelledby="gender-radio-buttons-group-label"
              >
                <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
              </RadioGroup>
            </FormControl>
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
          <Grid item xs={12}>
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
                Tạo thông tin
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

export default RegisterModal
