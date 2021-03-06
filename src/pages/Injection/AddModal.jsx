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
    if (!value) errTxt = 'Vui l??ng nh???p tr?????ng n??y'
    else {
      if (name === 'injection_date' && new Date(value) > new Date()) {
        errTxt = 'Ng??y ti??m kh??ng v?????t qu?? ng??y hi???n t???i'
      }
      if (name === 'images' && e.target.files) {
        if (e.target.files.length !== 2) {
          errTxt = 'Vui l??ng ch???n ????ng 2 h??nh ???nh'
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
      setErrorAlertText('Vui l??ng nh???p ?????y ????? v?? h???p l??? th??ng tin')
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
          text={'Th??m th??nh c??ng'}
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
            <Typography variant="h6">Th??m th??ng tin ti??m ch???ng</Typography>
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
                    helperText={errInputUser && 'Vui l??ng ch???n ng?????i d??ng'}
                    {...params}
                    label="T??m ng?????i d??ng b???ng t??n, s??? ??i???n tho???i ho???c email"
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
              label="H??? t??n"
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
              label="S??? ??i???n tho???i"
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
                Lo???i v???c-xin
              </InputLabel>
              {vaccineTypeOptions && (
                <Select
                  labelId="demo-simple-select-label"
                  id="vaccine_type_id"
                  name="vaccine_type_id"
                  label="Lo???i v???c-xin"
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
              label="Ng??y ti??m"
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
                  Th??m ???nh
                </Button>
              </label>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mr: 2,
                }}
              >
                L??u
              </Button>
              <Button variant="text" onClick={handleClose}>
                ????ng
              </Button>
            </Box>
          </Grid>
          {form.images.errTxt && (
            <Grid item xs={12}>
              <Alert severity={'error'}>Vui l??ng ch???n ????ng 2 h??nh ???nh</Alert>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  )
}

export default AddModal
