import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
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
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

  const [vaccineTypeOptions, setVaccineTypeOptions] = useState()

  const [form, setForm] = useState({
    user_name: data.user.name,
    user_phone: data.user.phone,
    user_email: data.user.email,
    vaccine_type_id: data.vaccine_type._id,
    vaccine_type_name: data.vaccine_type.name,
    injection_date: data.injection_date,
    images: data.images || [],
    time: data.time,
  })

  useEffect(() => {
    getVaccineTypes().then((rs) => {
      setVaccineTypeOptions(rs.data.data)
    })
  }, [])

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    let fieldsChange = {
      [name]: value,
    }

    if (name === 'vaccine_type_id') {
      const vaccine_type_name = vaccineTypeOptions.find(
        (option, index) => option._id === value
      ).name
      fieldsChange['vaccine_type_name'] = vaccine_type_name
    }

    // Edit Image
    if (name === 'images' && e.target.files) {
      if (e.target.files.length !== 2) {
        setErrorAlertText('Vui lòng chọn 2 hình ảnh')
        return
      }

      const images = [
        URL.createObjectURL(e.target.files[0]),
        URL.createObjectURL(e.target.files[1]),
      ]
      fieldsChange = {
        images,
      }
    }

    setForm({ ...form, ...fieldsChange })
    setEnableSubmitBtn(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

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
        setEnableSubmitBtn(false)
        updateRows()
      })
      .catch((err) => console.log(err))
  }

  return (
    <Modal
      handleClose={handleClose}
      sx={{
        minWidth: 600,
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
              sx={{
                marginRight: '10px',
              }}
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
              value={dateFormat(form.injection_date, 'yyyy-mm-dd')}
              onChange={(e) => handleInput(e)}
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
                  value={form.vaccine_type_id}
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
            <Typography variant="subtitle1" align="center">
              <strong>Mũi thứ {form.time}</strong>
            </Typography>
          </Grid>

          {form.images.map((image, index) => (
            <Grid item lg={6} key={index}>
              <Avatar
                variant="square"
                sx={{ mr: 2, width: '100%', height: '100%' }}
                src={
                  typeof image === 'string'
                    ? image
                    : process.env.REACT_APP_SERVER + image.url
                }
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

export default EditModal
