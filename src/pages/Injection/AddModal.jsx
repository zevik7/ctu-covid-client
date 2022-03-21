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
import Alert from '@mui/material/Alert'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { getVaccineTypes, getUsers, storeInjection } from '../../api'

const AddForm = (props) => {
  const { handleClose } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

  const [errInputUser, setErrInputUser] = useState(false)
  const [vaccineTypeOptions, setVaccineTypeOptions] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])

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

    if (name === 'vaccine_type_id') {
      const vaccine_type_name = vaccineTypeOptions.find(
        (option, index) => option._id === value
      ).name
      fieldsChange['vaccine_type_name'] = vaccine_type_name
    }

    setForm({ ...form, ...fieldsChange })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.user_id) return

    const data = {
      user: {
        _id: form.user_id,
        name: form.user_name,
        phone: form.user_phone,
        email: form.user_email,
      },
      vaccine_type: {
        _id: form.vaccine_type_id,
        name: form.vaccine_type_name,
      },
      injection_date: form.injection_date,
      images: form.images,
    }

    storeInjection(data)
      .then(() => {
        setSuccessAlert(true)
        setEnableSubmitBtn(false)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Modal handleClose={handleClose}>
      {successAlert && (
        <AlertDialog
          text={'Thêm thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h6">Thêm thông tin tiêm chủng</Typography>
          </Grid>
          <Grid item md={12}>
            {searchSuggestions && (
              <Autocomplete
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
          </Grid>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <TextField
                required
                fullWidth
                disabled
                id="user_name"
                label="Họ tên"
                name="user_name"
                autoComplete="user_name"
                autoFocus
                value={form.user_name}
                onChange={(e) => handleInput(e)}
                sx={{
                  marginRight: '10px',
                }}
              />
            </Box>
          </Grid>
          <Grid item md={6}>
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
              onChange={(e) => handleInput(e)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              required
              fullWidth
              disabled
              id="user_email"
              label="Email"
              name="user_email"
              value={form.user_email}
              onChange={(e) => handleInput(e)}
            />
          </Grid>
          <Grid item md={6}>
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
                  onChange={(e) => handleInput(e)}
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
          </Grid>
          <Grid item md={6}>
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
              onChange={(e) => handleInput(e)}
            />
          </Grid>

          {form.images &&
            form.images.map((image, index) => (
              <Grid item lg={6} key={index}>
                <Avatar
                  variant="square"
                  sx={{ mr: 2, width: '100%', height: '100%' }}
                  src={process.env.REACT_APP_SERVER + image.url}
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
              <Button
                variant="outlined"
                sx={{
                  mr: 'auto',
                }}
              >
                Thêm ảnh
              </Button>
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
            {successAlert && <Alert severity="success">Lưu thành công</Alert>}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default AddForm
