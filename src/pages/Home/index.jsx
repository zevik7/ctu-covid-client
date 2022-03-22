import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import Copyright from '../../components/Copyright'
import Logo from '../../components/Logo'

const theme = createTheme()

export default function Home() {
  const [areaSeleted, setAreaSelected] = useState('local')

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Logo
              sx={{
                width: '160px',
                borderRight: 2,
                borderColor: 'grey.500',
              }}
              textVariant="subtitle1"
            />
            <Typography
              variant="h5"
              display="inline-block"
              align="center"
              sx={{
                flex: 1,
              }}
            >
              {process.env.REACT_APP_WEBSITE_NAME}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} container alignItems="center">
              <Typography
                variant="h6"
                sx={{
                  flex: 1,
                }}
              >
                Số liệu thống kê
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={areaSeleted}
                exclusive
                onChange={(e) => setAreaSelected(e.target.value)}
                sx={{
                  '.MuiButtonBase-root': {
                    pt: 0,
                    pb: 0,
                  },
                }}
              >
                <ToggleButton value="local">Khu vực</ToggleButton>
                <ToggleButton value="vietnam">Việt Nam</ToggleButton>
                <ToggleButton value="world">Thế giới</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}
