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
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

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
    vaccine_type_id: '',
    vaccine_type_name: '',
    injection_date: dateFormat(Date.now(), 'yyyy-mm-dd'),
    images: [],
  })

  useEffect(() => {
    getUsers({
      search: searchText,
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
        vaccine_type_id: rs.data.data[0]._id,
        vaccine_type_name: rs.data.data[0].name,
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
    setEnableSubmitBtn(true)
  }

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    let fieldsChange = {
      [name]: value,
    }

    // Change vaccine type select
    if (name === 'vaccine_type_id') {
      const vaccine_type_name = vaccineTypeOptions.find(
        (option, index) => option._id === value
      ).name
      fieldsChange['vaccine_type_name'] = vaccine_type_name
    }

    // Add Image
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

    if (!form.user_id) return

    const data = new FormData(event.currentTarget)

    storeInjection(data)
      .then(() => {
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
                  value={form.vaccine_type_id}
                >
                  {vaccineTypeOptions.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            <TextField
              required
              fullWidth
              name="vaccine_type_name"
              value={form.vaccine_type_name}
              sx={{
                display: 'none',
              }}
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
              value={form.injection_date}
              onChange={handleInput}
            />
          </Grid>

          {form.images.map((image, index) => (
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

export default AddModal
