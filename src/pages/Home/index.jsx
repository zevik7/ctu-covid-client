import { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import dateFormat from 'dateformat'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Divider, ListItemButton } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import Chip from '@mui/material/Chip'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined'

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined'

import Map from '../../components/Map'
import Copyright from '../../components/Copyright'
import Logo from '../../components/Logo'
import {
  LineWithLabelsPositiveCase,
  PieChartInjection,
} from '../../components/ChartOptions'

import { getLocations } from '../../api'

import LookupModal from './LookupModal'
import ArticleModal from './ArticleModal'
import PositiveDeclarationModal from './PositiveDeclarationModal'
import RegisterModal from './RegisterModal'

import { getPDStatByDates, getPostitiveDeclarations } from '../../api'

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [areaSeleted, setAreaSelected] = useState('local')
  const [openLookupModal, setOpenLookupModal] = useState(false)
  const [openArticleModal, setOpenArticleModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openPositiveDeclarationModal, setOpenPositiveDeclarationModal] =
    useState(false)

  const [locations, setLocations] = useState([])
  const [positiveDecla, setPositiveDecla] = useState([])
  const [pdStatByDates, setPDStatByDates] = useState()

  const toggleDrawer = (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }

    setOpenDrawer(!openDrawer)
  }

  useEffect(() => {
    getLocations()
      .then((rs) => setLocations(rs.data.data))
      .catch((err) => console.log(err))

    getPDStatByDates()
      .then((rs) => {
        setPDStatByDates(rs.data)
      })
      .catch((err) => console.log(err))

    getPostitiveDeclarations().then((rs) => {
      setPositiveDecla(rs.data.data)
    })
  }, [])

  const MenuItems = (props) => (
    <Box sx={props.sx} {...props}>
      <Button
        variant="outlined"
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
        Khai báo F0 <MedicalInformationIcon sx={{ ml: 1 }} />
      </Button>
    </Box>
  )

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
      <Container maxWidth="xl">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={'auto'}>
            <Logo
              sx={{
                width: {
                  xs: 140,
                  md: 170,
                },
              }}
            />
          </Grid>
          <Grid item xs={'auto'}>
            <MenuItems
              sx={{
                display: {
                  xs: 'none',
                  md: 'block',
                },
              }}
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" align="center" color="text.secondary">
                  Danh sách thao tác
                </Typography>
                <Divider />
                <MenuItems
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: 230,
                    height: 140,
                    p: 1,
                  }}
                  onClick={toggleDrawer}
                  onKeyDown={toggleDrawer}
                />
              </Box>
            </Drawer>
          </Grid>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent={'center'}
          >
            <Typography variant="h6" sx={{ mr: 1, color: 'text.secondary' }}>
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
                bgcolor: '#e3f2fd',
                borderRadius: 2,
              }}
              align="center"
            >
              Tổng số ca nhiễm: 3210
            </Typography>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={6} container>
              <Grid item xs={12}>
                <Chip
                  icon={<VaccinesOutlinedIcon />}
                  variant="outlined"
                  label={<Typography>Thống kê tiêm vắc-xin</Typography>}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                container
                alignItems={'center'}
                justifyContent="center"
              >
                <Typography
                  variant="h5"
                  align="center"
                  color={'success.main'}
                  sx={{
                    mt: 1,
                  }}
                >
                  Tổng người đã tiêm:{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Chart
                  options={{
                    ...PieChartInjection,
                  }}
                  series={[76, 61, 90]}
                  type="radialBar"
                  width={'100%'}
                  height={200}
                />
              </Grid>
              <Grid item xs={12}>
                <Chip
                  icon={<VaccinesOutlinedIcon />}
                  variant="outlined"
                  label={<Typography>Biểu đồ số ca nhiễm</Typography>}
                  sx={{ mb: 1 }}
                />
                {pdStatByDates && (
                  <Chart
                    options={{
                      ...LineWithLabelsPositiveCase,
                      xaxis: {
                        categories: pdStatByDates.dates,
                        labels: {
                          formatter: function (value) {
                            return dateFormat(value, 'dd/mm/yy')
                          },
                        },
                      },
                    }}
                    series={[
                      {
                        name: 'Số ca nhiễm',
                        data: pdStatByDates.positive_case,
                      },
                      {
                        name: 'Triệu chứng nặng',
                        data: pdStatByDates.serious_case,
                      },
                    ]}
                    width="100%"
                    height={200}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Chip
                icon={<QuizOutlinedIcon />}
                label={<Typography>Các điểm khai báo y tế</Typography>}
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <Map
                markers={locations.map((location, index) => ({
                  position: location.position,
                  popup: location.name,
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
              <Chip
                icon={<CoronavirusOutlinedIcon />}
                label={<Typography>Những vị trí xuất hiện ca nhiễm</Typography>}
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <Map
                style={{
                  height: '600px',
                }}
                markers={positiveDecla.map((el, i) => ({
                  position: el.location.position,
                  popup: el.location.name,
                }))}
                useRedDotIcon={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Chip
                icon={<QuizOutlinedIcon />}
                color="primary"
                label={<Typography>Hướng dẫn y tế</Typography>}
              />
              <List>
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
              <Chip
                icon={<NotificationsNoneIcon />}
                color="primary"
                label={<Typography> Thông báo</Typography>}
              />
              <List>
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
        </Grid>
        <Copyright />
      </Container>
    </>
  )
}
