import { useState, useEffect } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import {
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  CssBaseline,
  Checkbox,
  FormControlLabel,
  Link,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material'

import Logo from '../Logo'
import Copyright from '../Copyright'
import AlertDialog from '../AlertDialog'
import { getLocation, storeDeclaration } from '../../api'

const Declaration = () => {
  const navigate = useNavigate()
  const { locationId } = useParams()
  const [location, setLocation] = useState({})

  const [errorAlertText, setErrorAlertText] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)

  const [indentityInput, setIndentityInput] = useState('')
  const [f1Radio, setF1Radio] = useState(false)
  const [symptom, setSymptomRadio] = useState(false)

  useEffect(() => {
    getLocation(locationId)
      .then((rs) => {
        setLocation(rs.data)
      })
      .catch(() => navigate('/*'))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!indentityInput) {
      setErrorAlertText('Vui lòng nhập số điện thoại hoặc email')
      return
    }

    storeDeclaration({
      user_indentity: indentityInput,
      location_id: locationId,
      status: {
        f1: f1Radio,
        symptom,
      },
    })
      .then(() => {
        setSuccessAlert(true)
        setIndentityInput('')
      })
      .catch((err) => {
        const typeErr = err.response?.data?.type
        const user_indentityErr = err.response?.data?.errors?.user_indentity
        if (typeErr && typeErr === 'validation')
          setErrorAlertText(user_indentityErr)
        return
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: (theme) => theme.palette.background.lightBlue,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <CssBaseline />
      {successAlert && (
        <AlertDialog
          text={'Khai báo thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      {errorAlertText && (
        <AlertDialog
          text={errorAlertText}
          severity="error"
          handleClose={() => setErrorAlertText('')}
        />
      )}
      <Box
        sx={{
          m: 1,
          p: 3,
          maxWidth: '600px',
          boxShadow: 4,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Logo
          sx={{
            width: '140px',
          }}
          textVariant="subtitle1"
        />
        <Typography
          variant="h5"
          sx={{
            mt: 3,
          }}
        >
          Khai báo y tế
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
          }}
        >
          Tại địa điểm: {location && location.name}
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="indentity"
          label="Nhập số điện thoại hoặc email"
          name="indentity"
          autoComplete="indentity"
          autoFocus
          onChange={(e) => setIndentityInput(e.target.value)}
          value={indentityInput}
        />
        <FormControl sx={{ mt: 2 }}>
          <FormLabel id="status2">
            <Typography align="center">Bạn đang là F1 ?</Typography>
          </FormLabel>
          <RadioGroup
            aria-labelledby="status2"
            name="controlled-radio-buttons-group"
            value={f1Radio}
            onChange={(e) => setF1Radio(e.target.value)}
            row
            sx={{
              justifyContent: 'center',
            }}
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Không"
              sx={{
                mr: 6,
              }}
            />
            <FormControlLabel value={true} control={<Radio />} label="Có" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ mt: 2 }}>
          <FormLabel id="status1">
            <Typography align="center">
              Bạn có triệu chứng của nhiễm bệnh ? (Ho, sốt, mệt mỏi, mất vị
              giác)
            </Typography>
          </FormLabel>
          <RadioGroup
            aria-labelledby="status1"
            name="controlled-radio-buttons-group"
            value={symptom}
            onChange={(e) => setSymptomRadio(e.target.value)}
            row
            sx={{
              justifyContent: 'center',
            }}
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Không"
              sx={{
                mr: 6,
              }}
            />
            <FormControlLabel value={true} control={<Radio />} label="Có" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Khai báo
        </Button>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  )
}

export default Declaration
