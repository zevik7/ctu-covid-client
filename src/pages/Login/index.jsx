import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Copyright from '../../components/Copyright'
import Logo from '../../components/Logo'
import { useAuth } from '../../context/Auth/Context'
import { loggin } from '../../api'

export default function Login() {
  const { user, onLogin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.token) navigate('/admin')
  }, [])

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      username,
      password,
    }

    loggin(data)
      .then((rs) => {
        onLogin(rs.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        backgroundImage: (theme) => theme.palette.background.lightBlue,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          m: 2,
          maxWidth: '500px',
          p: {
            md: 6,
            xs: 3,
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 4,
          bgcolor: 'background.paper',
        }}
      >
        <Logo
          sx={{
            width: '200px',
          }}
          textVariant="h5"
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{
            marginTop: '50px',
          }}
        >
          ????ng nh???p
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="T??i kho???n"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => {
              setUserName(e.target.value)
            }}
            value={username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="M???t kh???u"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ghi nh??? t??i"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            ????ng nh???p
          </Button>
          <Link href="#" variant="body2">
            Qu??n m???t kh???u?
          </Link>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  )
}
