import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { updatePostitiveDeclaration } from '../../api'

import dateFormat from 'dateformat'

const NegativeDeclarationModal = (props) => {
  const { handleClose, handleOpenRegisterModal, handleOpenPositiveModal } =
    props

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlertTxt, setErrorAlertTxt] = useState(false)

  const [form, setForm] = useState({
    user_identity: {
      value: '',
      errTxt: '',
    },
    end_date: {
      value: new Date(),
      errTxt: '',
    },
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    let errTxt = ''

    if (!value) {
      errTxt = 'Vui lòng nhập trường này'
    } else {
      if (name === 'end_date' && new Date(value) > new Date()) {
        errTxt = 'Ngày khỏi không được vượt quá ngày hiện tại'
      }
    }

    setForm({ ...form, [name]: { value, errTxt } })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.user_identity.value || form.end_date.errTxt) {
      setErrorAlertTxt('Vui lòng nhập đầy đủ và hợp lệ thông tin')
      return
    }

    updatePostitiveDeclaration({
      user_identity: form.user_identity.value,
      end_date: form.end_date.value,
    })
      .then(() => {
        setSuccessAlert(true)
        setForm({
          user_identity: {
            value: '',
            errTxt: '',
          },
          end_date: {
            value: new Date(),
            errTxt: '',
          },
        })
      })
      .catch((err) => {
        const errorsData = err?.response?.data

        if (
          errorsData &&
          errorsData.type === 'validation' &&
          errorsData.errors
        ) {
          const { user_identity, exist_record, end_date } = errorsData.errors
          if (user_identity) {
            setForm((form) => ({
              ...form,
              user_identity: {
                ...form.user_identity,
                errTxt: user_identity,
              },
            }))
          }
          if (exist_record) {
            setErrorAlertTxt(exist_record)
          }
          if (end_date) {
            setErrorAlertTxt(end_date)
          }
        }
      })
  }

  return (
    <Modal handleClose={handleClose}>
      {successAlert && (
        <AlertDialog
          title="Thông báo"
          text={'Khai báo khỏi bệnh thành thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      {errorAlertTxt && (
        <AlertDialog
          severity="error"
          title="Thông báo"
          text={errorAlertTxt}
          handleClose={() => setErrorAlertTxt('')}
        />
      )}
      <Box component={'form'} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            container
            justifyContent={{
              sm: 'space-between',
              xs: 'center',
            }}
            alignItems="center"
          >
            <Typography variant="h6">Khai báo thông tin ca nhiễm</Typography>
            <Button
              variant="text"
              endIcon={<AccountCircleOutlinedIcon />}
              onClick={handleOpenRegisterModal}
            >
              Đăng ký thông tin
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent={'center'}
            alignItems="center"
          >
            <ToggleButtonGroup
              value={'negative'}
              exclusive
              sx={{
                '.MuiButtonBase-root': {
                  pt: 0,
                  pb: 0,
                },
              }}
            >
              <ToggleButton
                value="positive"
                color="error"
                onClick={handleOpenPositiveModal}
              >
                Đang nhiễm
              </ToggleButton>
              <ToggleButton value="negative" color="success">
                Đã khỏi
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              required
              fullWidth
              id="user_identity"
              label="Nhập số điện thoại hoặc email"
              name="user_identity"
              autoComplete="user_identity"
              autoFocus
              value={form.user_identity.value}
              onChange={(e) => handleInput(e)}
              error={form.user_identity.errTxt ? true : false}
              helperText={form.user_identity.errTxt}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="end_date"
              label="Ngày khỏi"
              type="date"
              name="end_date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateFormat(form.end_date.value, 'yyyy-mm-dd')}
              onChange={(e) => handleInput(e)}
              error={form.end_date.errTxt ? true : false}
              helperText={form.end_date.errTxt}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button type="submit" variant="contained">
                Xác nhận
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

export default NegativeDeclarationModal
