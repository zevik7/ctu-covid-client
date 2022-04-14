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
  const { updateRows, handleClose } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlertText, setErrorAlertText] = useState('')

  const [errInputUser, setErrInputUser] = useState(false)
  const [vaccineTypeOptions, setVaccineTypeOptions] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])

  const autoCompleteRef = useRef(null)

  const [form, setForm] = useState({
    user_id: '',
    user_name: '',
    user_phone: '',
    user_email: '',
    vaccine_type_id: {
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
    getUsers({
      searchText,
      currentPage: 1,
      perPage: 20,
    }).then((rs) => {
      setSearchSuggestions(rs.data.data)
    })
  }, [searchText])

  useEffect(() => {
    getVaccineTypes().then((rs) => {
      setVaccineTypeOptions(rs.data.data)
      setForm({
        ...form,
        vaccine_type_id: {
          value: rs.data.data[0]._id,
          errTxt: '',
        },
      })
    })
  }, [])

  const handleSelectOption = (option) => {
    let emptyErr = true
    let userSelected = {
      user_id: '',
      user_name: '',
      user_phone: '',
      user_email: '',
    }

    if (option) {
      emptyErr = false
      userSelected = {
        user_id: option._id,
        user_name: option.name,
        user_phone: option.phone,
        user_email: option.email,
      }
    }

    setForm({
      ...form,
      ...userSelected,
    })
    setErrInputUser(emptyErr)
  }

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

    if (
      !form.user_id ||
      form.images.value.length !== 2 ||
      form.injection_date.errTxt
    ) {
      setErrorAlertText('Vui lòng nhập đầy đủ và hợp lệ thông tin')
      return
    }

    const data = new FormData(event.currentTarget)

    storeInjection(data)
      .then(() => {
        setSuccessAlert(true)
        setSearchText('')
        setForm((form) => ({
          ...form,
          user_id: '',
          user_name: '',
          user_phone: '',
          user_email: '',
          injection_date: {
            value: '',
            errTxt: '',
          },
          images: { value: [], errTxt: '' },
        }))
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
            {searchSuggestions && (
              <Autocomplete
                ref={autoCompleteRef}
                required
                fullWidth
                id="search-field"
                autoFocus
                filterOptions={(options, state) => options}
                onChange={(event, newValue) => {
                  handleSelectOption(newValue)
                }}
                inputValue={searchText}
                onInputChange={(event, newInputValue) => {
                  setSearchText(newInputValue)
                }}
                options={searchSuggestions}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    error={errInputUser}
                    helperText={errInputUser && 'Vui lòng chọn người dùng'}
                    {...params}
                    label="Tìm người dùng bằng tên, số điện thoại hoặc email"
                  />
                )}
              />
            )}
            <TextField
              required
              fullWidth
              name="user_id"
              value={form.user_id}
              sx={{
                display: 'none',
              }}
            />
            <TextField
              required
              fullWidth
              disabled
              margin="normal"
              id="user_name"
              label="Họ tên"
              name="user_name"
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
              name="user_phone"
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
              name="user_email"
              value={form.user_email}
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
