import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Input from '@mui/material/Input'
import Avatar from '@mui/material/Avatar'

import Modal from '../../components/Modal'
import { useAuth } from '../../context/Auth'
import { getUser, updateUser } from '../../api'

const SettingModal = (props) => {
  const { handleClose } = props

  const auth = useAuth()

  const [successAlert, setSuccessAlert] = useState(false)
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)
  const [avatarUpload, setAvatarUpload] = useState(null)

  const [form, setForm] = useState({
    name: { value: '', error: false, errorTxt: '' },
    birthday: { value: '', error: false, errorTxt: '' },
    gender: { value: '', error: false, errorTxt: '' },
    email: { value: '', error: false, errorTxt: '' },
    phone: { value: '', error: false, errorTxt: '' },
    address: { value: '', error: false, errorTxt: '' },
    avatar: { value: '', error: false, errorTxt: '' },
  })

  useEffect(() => {
    getUser(auth.user._id).then((rs) => {
      let authUser = Object.assign({}, rs.data.data)
      let authUserMap = {}
      Object.keys(authUser).map((key) => {
        authUserMap[key] = {
          value: authUser[key],
          error: false,
          errorTxt: '',
        }
      })
      setForm(authUserMap)
    })
  }, [])

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
    setEnableSubmitBtn(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isError = Object.keys(form).find((key, index) => form[key].error)

    if (isError) return

    const data = new FormData(event.currentTarget)

    updateUser(
      {
        _id: auth.user._id,
      },
      data
    )
      .then((rs) => {
        setSuccessAlert(true)
        auth.handleOnSetUser({ ...auth.user, ...rs.data })
        setEnableSubmitBtn(false)
      })
      .catch((err) => console.log(err))
  }

  const handleChangeAvatar = (e) => {
    setEnableSubmitBtn(true)

    if (e.target.files && e.target.files[0]) {
      let avatar = e.target.files[0]
      setAvatarUpload(URL.createObjectURL(avatar))
    }
  }

  return (
    <Modal handleClose={handleClose}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          minWidth: 300,
        }}
      >
        <Typography variant="h6">Thông tin cá nhân</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid
            container
            item
            xs={7}
            lg={4}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              src={
                avatarUpload
                  ? avatarUpload
                  : process.env.REACT_APP_SERVER + form.avatar.value
              }
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
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
          <Grid item ex={12} lg={8}>
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
            <Box
              sx={{
                width: '100%',
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
                sx={{ mr: 2, minWidth: 150 }}
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
                Lưu
              </Button>
              <Button variant="text" onClick={handleClose}>
                Đóng
              </Button>
            </Box>
            {successAlert && (
              <Modal
                open={successAlert}
                handleClose={() => setSuccessAlert(false)}
                sx={{
                  p: 0,
                }}
              >
                <Alert
                  severity="success"
                  onClose={() => setSuccessAlert(false)}
                  sx={{
                    fontSize: 16,
                    alignItems: 'center',
                    '.MuiAlert-action': {
                      pt: 0,
                    },
                    '.MuiAlert-message': {
                      whiteSpace: 'nowrap',
                    },
                  }}
                >
                  Lưu thành công
                </Alert>
              </Modal>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default SettingModal
