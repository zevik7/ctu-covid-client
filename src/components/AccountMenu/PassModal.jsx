import { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { updatePassword } from '../../api'

const PassModal = (props) => {
  const { userId, handleClose } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

  const [form, setForm] = useState({
    password: { value: '', errTxt: '' },
    newPassword: { value: '', errTxt: '' },
    retypeNewPassWord: { value: '', errTxt: '' },
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    let errTxt = ''

    if (!value) errTxt = 'Yêu cầu nhập trường này'
    else {
      if (name === 'newPassword' && value.length < 6)
        errTxt = 'Mật khẩu phải có tối thiểu 6 kí tự'
      if (name === 'retypeNewPassword' && value !== form.newPassword.value)
        errTxt = 'Mật khẩu nhập lại chưa đúng'
    }

    setForm({ ...form, [name]: { value, errTxt } })
    setEnableSubmitBtn(!errTxt ? true : false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.password.value || !form.newPassword.value) return

    const data = new FormData(event.currentTarget)

    updatePassword(
      {
        _id: userId,
      },
      data
    )
      .then(() => {
        setSuccessAlert(true)
        setEnableSubmitBtn(false)
      })
      .catch((errors) => {
        const errorsData = errors?.response?.data
        if (errorsData && errorsData.type === 'unmatch' && errorsData.errors) {
          if (errorsData.errors.password) {
            setForm({
              ...form,
              password: {
                ...form.password,
                errTxt: errorsData.errors.password,
              },
            })
          }
        }
      })
  }

  return (
    <Modal
      handleClose={handleClose}
      sx={{
        width: {
          md: '40%',
          lg: '30%',
        },
      }}
    >
      {successAlert && (
        <AlertDialog
          text="Đổi mật khẩu thành công"
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6">Đổi mật khẩu</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="password"
              label="Mật khẩu cũ"
              type="password"
              name="password"
              value={form.password.value}
              onChange={(e) => handleInput(e)}
              error={form.password.errTxt && true}
              helperText={form.password.errTxt}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="newPassword"
              type="password"
              label="Nhập mật khẩu mởi"
              name="newPassword"
              value={form.newPassword.value}
              onChange={(e) => handleInput(e)}
              error={form.newPassword.errTxt && true}
              helperText={form.newPassword.errTxt}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="retypeNewPassWord"
              type="password"
              label="Nhập lại mật khẩu mởi"
              name="retypeNewPassWord"
              value={form.retypeNewPassWord.value}
              onChange={(e) => handleInput(e)}
              error={form.retypeNewPassWord.errTxt && true}
              helperText={form.retypeNewPassWord.errTxt}
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
                  mr: 1,
                }}
                disabled={!enableSubmitBtn}
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
    </Modal>
  )
}

export default PassModal
