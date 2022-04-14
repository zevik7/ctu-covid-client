import { useState, useEffect, useRef } from 'react'
import dateFormat from 'dateformat'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { getVaccineTypes, getUsers, storeInjection } from '../../api'

const Input = styled('input')({
  display: 'none',
})

const AddModal = (props) => {
  const { handleClose } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlertText, setErrorAlertText] = useState('')
  const [vaccineTypeOptions, setVaccineTypeOptions] = useState([])

  const [form, setForm] = useState({
    user_identity: {
      value: '',
      errTxt: '',
    },
    vaccine_type_id: {
      value: '',
    },
    vaccine_type_name: {
      value: '',
    },
    injection_date: {
      value: new Date(),
      errTxt: '',
    },
    images: {
      value: [],
      errTxt: '',
    },
  })

  useEffect(() => {
    getVaccineTypes().then((rs) => {
      setVaccineTypeOptions(rs.data.data)
      setForm({
        ...form,
        vaccine_type_id: {
          value: rs.data.data[0]._id,
        },
        vaccine_type_name: {
          value: rs.data.data[0].name,
        },
      })
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
        errTxt = 'Ngày nhiễm không vượt quá ngày hiện tại'
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

    // Prevent submit if there are any errors
    if (
      !form.user_identity.value ||
      form.images.value.length !== 2 ||
      form.injection_date.errTxt
    ) {
      setErrorAlertText('Vui lòng nhập đầy đủ và hợp lệ thông tin')
      return
    }

    const data = new FormData(event.currentTarget)

    storeInjection(data)
      .then(() => {
        setForm((form) => ({
          ...form,
          user_identity: {
            value: '',
            errTxt: '',
          },
          injection_date: {
            value: '',
            errTxt: '',
          },
          images: { value: [], errTxt: '' },
        }))
        setSuccessAlert(true)
      })
      .catch((err) => {
        const errorsData = err?.response?.data

        if (
          errorsData &&
          errorsData.type === 'validation' &&
          errorsData.errors
        ) {
          if (errorsData.errors.user_identity) {
            setForm({
              ...form,
              user_identity: {
                ...form.user_identity,
                errTxt: errorsData.errors.user_identity,
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
          lg: '60%',
        },
      }}
    >
      {successAlert && (
        <AlertDialog
          text={'Thêm thành công'}
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
            <Typography variant="h6">Thêm thông tin tiêm chủng</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="user_identity"
              label="Nhập số điện thoại hoặc email"
              name="user_identity"
              autoComplete="user_identity"
              autoFocus
              value={form.user_identity.value}
              onChange={handleInput}
              error={form.user_identity.errTxt ? true : false}
              helperText={form.user_identity.errTxt}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Loại vắc-xin
              </InputLabel>
              {vaccineTypeOptions && (
                <Select
                  labelId="demo-simple-select-label"
                  id="vaccine_type_id"
                  name="vaccine_type_id"
                  label="Loại vắc-xin"
                  onChange={handleInput}
                  value={form.vaccine_type_id.value}
                >
                  {vaccineTypeOptions.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
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
                  Thêm ảnh
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

export default AddModal
