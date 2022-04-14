import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/material/styles'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { updateInjection, getVaccineTypes } from '../../api'

const Input = styled('input')({
  display: 'none',
})

const EditModal = (props) => {
  const { data, updateRows, handleClose } = props

  const _id = data._id

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlertText, setErrorAlertText] = useState('')

  const [vaccineTypeOptions, setVaccineTypeOptions] = useState()

  const [form, setForm] = useState({
    user_name: data.user.name,
    user_phone: data.user.phone,
    user_email: data.user.email,
    vaccine_type_id: {
      value: data.vaccine_type._id,
    },
    injection_date: {
      value: data.injection_date,
      errTxt: '',
    },
    images: {
      value: data.images,
      errTxt: '',
    },
    time: data.time,
  })

  useEffect(() => {
    getVaccineTypes().then((rs) => {
      setVaccineTypeOptions(rs.data.data)
    })
  }, [])

  const handleInput = (e) => {
    const name = e.target.name
    let value = e.target.value
    let errTxt = ''

    // Validate
    if (!value) errTxt = 'Vui lòng nhập trường này'
    else {
      if (name === 'injection_date' && new Date(value) > new Date()) {
        errTxt = 'Ngày tiêm không vượt quá ngày hiện tại'
      }
      if (name === 'images' && e.target.files) {
        if (e.target.files.length !== 2) {
          errTxt = 'Vui lòng chọn đúng 2 hình ảnh'
        }
      }
    }

    // Add Image
    if (name === 'images') {
      if (!errTxt)
        value = [
          URL.createObjectURL(e.target.files[0]),
          URL.createObjectURL(e.target.files[1]),
        ]
      else value = []
    }

    setForm({
      ...form,
      [name]: {
        value,
        errTxt,
      },
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (form.images.value.length !== 2 || form.injection_date.errTxt) {
      setErrorAlertText('Vui lòng nhập đầy đủ và hợp lệ thông tin')
      return
    }

    const data = new FormData(event.currentTarget)

    // Edit action
    updateInjection(
      {
        _id,
      },
      data
    )
      .then((rs) => {
        setSuccessAlert(true)
        updateRows()
      })
      .catch((err) => console.log(err))
  }

  return (
    <Modal
      handleClose={handleClose}
      sx={{
        width: {
          lg: '60%',
        },
      }}
    >
      {successAlert && (
        <AlertDialog
          text={'Cập nhật thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      {errorAlertText && (
        <AlertDialog
          text={errorAlertText}
          severity="error"
          handleClose={() => setErrorAlertText(false)}
        />
      )}
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Cập nhật thông tin tiêm chủng</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              disabled
              id="user_name"
              label="Họ tên"
              autoComplete="user_name"
              autoFocus
              value={form.user_name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              disabled
              id="user_phone"
              label="Số điện thoại"
              autoComplete="user_phone"
              autoFocus
              value={form.user_phone}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              disabled
              id="user_email"
              label="Email"
              value={form.user_email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="injection_date"
              label="Ngày tiêm"
              type="date"
              name="injection_date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateFormat(form.injection_date.value, 'yyyy-mm-dd')}
              onChange={handleInput}
              error={form.injection_date.errTxt ? true : false}
              helperText={form.injection_date.errTxt}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InputLabel id="select-standard-label" sx={{ mr: 2 }}>
                Loại vắc-xin
              </InputLabel>
              {vaccineTypeOptions && (
                <Select
                  labelId="select-standard-label"
                  id="vaccine_type_id"
                  name="vaccine_type_id"
                  onChange={(e) => handleInput(e)}
                  value={form.vaccine_type_id.value}
                  sx={{
                    flex: 1,
                  }}
                >
                  {vaccineTypeOptions.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h6" align="center" color="secondary.main">
              <strong>Mũi thứ {form.time}</strong>
            </Typography>
          </Grid>

          {form.images.value.map((image, index) => (
            <Grid item xs={12} lg={6} key={index}>
              <img
                img="square"
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                }}
                src={
                  typeof image === 'string'
                    ? image
                    : process.env.REACT_APP_SERVER + image.url
                }
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <label
                htmlFor="contained-button-file2"
                style={{
                  marginRight: 'auto',
                }}
              >
                <Input
                  name="images"
                  accept="image/*"
                  id="contained-button-file2"
                  type="file"
                  sx={{
                    display: 'none',
                  }}
                  onChange={handleInput}
                  multiple
                />
                <Button variant="outlined" component="span">
                  Sửa ảnh
                </Button>
              </label>
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
          {form.images.errTxt && (
            <Grid item xs={12}>
              <Alert severity={'error'}>Vui lòng chọn đúng 2 hình ảnh</Alert>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  )
}

export default EditModal
