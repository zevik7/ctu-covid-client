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
import { useAuth } from '../../components/Auth/Context'
import { loggin } from '../../api'

const theme = createTheme()

export default function SignInSide() {
  const { token, onLogin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) navigate('/admin')
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    loggin(data)
      .then((rs) => {
        onLogin(rs.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            maxWidth: '600px',
            my: 8,
            mx: 4,
            p: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: theme.shadows[4],
            backgroundColor: theme.palette.grey[50],
          }}
        >
          <Logo />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginTop: '50px',
            }}
          >
            Đăng nhập
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tài khoản"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Ghi nhớ tôi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {/* {"Don't have an account? Sign Up"} */}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
