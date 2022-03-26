import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import SearchIcon from '@mui/icons-material/Search'
import ImageIcon from '@mui/icons-material/Image'

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import Map from '../../components/Map'

import Copyright from '../../components/Copyright'
import Logo from '../../components/Logo'

import { getLocations, destroyLocations } from '../../api'
import { Divider, ListItemButton } from '@mui/material'

import LineChart from '../../components/Chart/LineChart'
import PieChart from '../../components/Chart/PieChart'
import LookupModal from './LookupModal'
import ArticleModal from './ArticleModal'
import PositiveDeclarationModal from './PositiveDeclarationModal'
import RegisterModal from './RegisterModal'
import Chart from 'react-apexcharts'

import { getStats, getPostitiveDeclarations } from '../../api'

const theme = createTheme()

const pieChart = {
  series: [98, 87, 61],
  options: {
    chart: {
      height: 390,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
    labels: ['Mũi 1', 'Mũi 2', 'Mũi 3'],
    legend: {
      show: true,
      floating: true,
      fontSize: '16px',
      position: 'left',
      offsetX: 160,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  },
}

export default function Home() {
  const navigate = useNavigate()

  const [areaSeleted, setAreaSelected] = useState('local')
  const [openLookupModal, setOpenLookupModal] = useState(false)
  const [openArticleModal, setOpenArticleModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openPositiveDeclarationModal, setOpenPositiveDeclarationModal] =
    useState(false)

  const [locations, setLocations] = useState([])
  const [positiveDecla, setPositiveDecla] = useState([])

  useEffect(() => {
    getLocations().then((rs) => setLocations(rs.data.data))
    getStats().then((rs) => {
      setPositiveDeclaByDates(rs.data.statDates)
    })
    getPostitiveDeclarations().then((rs) => {
      setPositiveDecla(rs.data.data)
    })
  }, [])

  const [positiveDeclaByDates, setPositiveDeclaByDates] = useState([])

  return (
    <>
      {openLookupModal && (
        <LookupModal handleClose={() => setOpenLookupModal(false)} />
      )}
      {openArticleModal && (
        <ArticleModal handleClose={() => setOpenArticleModal(false)} />
      )}
      {openRegisterModal && (
        <RegisterModal handleClose={() => setOpenRegisterModal(false)} />
      )}
      {openPositiveDeclarationModal && (
        <PositiveDeclarationModal
          handleClose={() => setOpenPositiveDeclarationModal(false)}
        />
      )}
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Logo
              sx={{
                width: '170px',
              }}
              textVariant="h6"
            />
            <Box>
              <Button
                variant="text"
                onClick={() => setOpenRegisterModal(true)}
                sx={{ mr: 1 }}
              >
                Tạo thông tin
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpenLookupModal(true)}
                sx={{ mr: 1 }}
              >
                Tra cứu <SearchIcon sx={{ ml: 1 }} />
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenPositiveDeclarationModal(true)}
                sx={{ mr: 1 }}
              >
                Khai báo F0 <MedicalInformationIcon sx={{ ml: 1, mb: '2px' }} />
              </Button>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justifyContent={'center'}
            >
              <Typography
                variant="subtitle1"
                sx={{ mr: 1, color: 'text.secondary' }}
              >
                Số liệu tại
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
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{
                  p: '2rem 0',
                  color: 'warning.main',
                  bgcolor: 'rgba(80, 184, 255, 0.11)',
                  borderRadius: 2,
                }}
                align="center"
              >
                Tổng số ca nhiễm: 3210
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Thống kê tiêm vắc-xin</Typography>
              <Chart
                options={pieChart.options}
                series={pieChart.series}
                type="radialBar"
                height="50%"
              />
              <LineChart
                name="Số ca nhiễm"
                data={positiveDeclaByDates}
                type="area"
                height={'50%'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Các điểm khai báo y tế</Typography>
              <Map
                markers={locations.map((location, index) => ({
                  position: location.position,
                  popup: '',
                }))}
                style={{
                  height: '400px',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Các vị trí xuất hiện ca nhiễm
              </Typography>
              <Map
                style={{
                  height: '600px',
                }}
                markers={positiveDecla.map((el, i) => ({
                  position: el.location.position,
                  popup: el.location.name,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="primary.main"
              >
                Hướng dẫn y tế <MenuBookIcon sx={{ ml: 1 }} />
              </Typography>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                <ListItemButton onClick={() => setOpenArticleModal(true)}>
                  <ListItemText
                    primary="Hướng dẫn gói chăm sóc sức khỏe tại nhà cho người F0, Hướng dẫn gói chăm sóc sức khỏe tại nhà cho người F0"
                    secondary="Cập nhật lần cuối 24/03/2022"
                    sx={{
                      '.MuiTypography-root': {
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      },
                    }}
                  />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="primary.main"
              >
                Thông báo <NotificationsNoneIcon />
              </Typography>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                <ListItemButton>
                  <ListItemText
                    primary="Thônng báo về tình hình dịch bệnh tại khu vực ngày 24/03"
                    sx={{
                      '.MuiTypography-root': {
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      },
                    }}
                  />
                </ListItemButton>
              </List>
            </Grid>
          </Grid>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}
