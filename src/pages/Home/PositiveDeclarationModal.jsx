import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { storePostitiveDeclaration } from '../../api'
import Map from '../../components/Map'

import dateFormat from 'dateformat'

const PositiveDeclarationModal = (props) => {
  const { handleClose, handleOpenRegisterModal, handleOpenNegativeModal } =
    props

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlertTxt, setErrorAlertTxt] = useState(false)

  const [form, setForm] = useState({
    user_identity: {
      value: '',
      errTxt: '',
    },
    start_date: {
      value: new Date(),
      errTxt: '',
    },
    severe_symptoms: {
      value: false,
      errTxt: '',
    },
    location: {
      position: { lat: '', lng: '' },
    },
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    let errTxt = ''

    if (!value) {
      errTxt = 'Vui lòng nhập trường này'
    } else {
      if (name === 'start_date' && new Date(value) > new Date()) {
        errTxt = 'Ngày nhiễm không được vượt quá ngày hiện tại'
      }
    }

    setForm({ ...form, [name]: { value, errTxt } })
  }

  const handleMapClick = (e) => {
    setForm({
      ...form,
      location: {
        position: e.latlng,
      },
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.user_identity.value || form.start_date.errTxt) {
      setErrorAlertTxt('Vui lòng nhập đầy đủ và hợp lệ thông tin')
      return
    }

    if (!form.location.position.lat) {
      setErrorAlertTxt('Vui lòng chọn vị trí trên bản đồ')
      return
    }

    storePostitiveDeclaration({
      user_identity: form.user_identity.value,
      location: {
        name: '',
        position: form.location.position,
      },
      severe_symptoms: form.severe_symptoms,
      start_date: form.start_date.value,
    })
      .then(() => {
        setSuccessAlert(true)
        setForm({
          user_identity: {
            value: '',
            errTxt: '',
          },
          start_date: {
            value: new Date(),
            errTxt: '',
          },
          severe_symptoms: {
            value: false,
            errTxt: '',
          },
          location: {
            position: { lat: '', lng: '' },
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
          if (errorsData.errors.user_identity) {
            setForm((form) => ({
              ...form,
              user_identity: {
                ...form.user_identity,
                errTxt: errorsData.errors.user_identity,
              },
            }))
          }
          if (errorsData.errors.exist_record) {
            setErrorAlertTxt(errorsData.errors.exist_record)
          }
        }
      })
  }

  return (
    <Modal handleClose={handleClose}>
      {successAlert && (
        <AlertDialog
          title="Thông báo"
          text={'Khai báo thành công'}
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
              Tạo thông tin
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
              value={'positive'}
              exclusive
              sx={{
                '.MuiButtonBase-root': {
                  pt: 0,
                  pb: 0,
                },
              }}
            >
              <ToggleButton value="positive" color="error">
                Đang nhiễm
              </ToggleButton>
              <ToggleButton
                value="negative"
                color="success"
                onClick={handleOpenNegativeModal}
              >
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
              id="start_date"
              label="Ngày dương tính"
              type="date"
              name="start_date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateFormat(form.start_date.value, 'yyyy-mm-dd')}
              onChange={(e) => handleInput(e)}
              error={form.start_date.errTxt ? true : false}
              helperText={form.start_date.errTxt}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="severe_symptoms">
                Bạn có xuất hiện các triệu chứng nặng ? (Khó thở, đau ngực, đau
                đầu...)
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="severe_symptoms"
                name="severe_symptoms"
                sx={{ justifyContent: 'center' }}
                value={form.severe_symptoms.value}
                onChange={(e) => handleInput(e)}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Không"
                />
                <FormControlLabel value={true} control={<Radio />} label="Có" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography>Chọn vị trí cách ly trên bản đồ</Typography>
            <Map
              style={{
                width: '100%',
                minHeight: '300px',
              }}
              useRedDotIcon={true}
              markers={[
                {
                  position: form.location.position,
                  popup: '',
                },
              ]}
              handleClick={handleMapClick}
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

export default PositiveDeclarationModal
