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
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import Chip from '@mui/material/Chip'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined'

import Map from '../../components/Map'
import Copyright from '../../components/Copyright'
import Logo from '../../components/Logo'
import Card from '../../components/Card'
import {
  LineWithLabelsPositiveCase,
  PieChartInjection,
} from '../../components/ChartOptions'

import { getLocations } from '../../api'

import LookupModal from './Lookup'
import ArticleModal from './ArticleModal'
import PositiveDeclarationModal from './PositiveDeclarationModal'
import NegativeDeclarationModal from './NegativeDeclarationModal'
import RegisterModal from './RegisterModal'
import WorldStat from './WorldStat'

import {
  getPDGeneralStat,
  getPostitiveDeclarations,
  getInjectionGeneralStat,
  getArticles,
} from '../../api'

export default function Home() {
  const [areaSeleted, setAreaSelected] = useState('local')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openLookupModal, setOpenLookupModal] = useState(false)
  const [openArticleModal, setOpenArticleModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openPositiveDeclarationModal, setOpenPositiveDeclarationModal] =
    useState(false)
  const [openNegativeDeclarationModal, setOpenNegativeDeclarationModal] =
    useState(false)

  const [locations, setLocations] = useState([])
  const [positiveDecla, setPositiveDecla] = useState([]) // For map
  const [pdStat, setPDStat] = useState({})
  const [injectionStat, setInjectionStat] = useState({})
  const [positiveCaseDiffSubTxt, setPositiveCaseDiffSubTxt] = useState('')
  const [articles, setArticles] = useState([])
  const [articleModalData, setArticleModalData] = useState({})

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

    getPDGeneralStat()
      .then((rs) => {
        setPDStat(rs.data)
        calTotalCaseSubText(rs.data?.by_date?.positive_case)
      })
      .catch((err) => console.log(err))

    getPostitiveDeclarations().then((rs) => {
      setPositiveDecla(rs.data.data)
    })

    getInjectionGeneralStat().then((rs) => {
      setInjectionStat(rs.data)
    })

    getArticles().then((rs) => setArticles(rs.data.data))
  }, [])

  const calTotalCaseSubText = (posCase) => {
    if (!posCase) return

    let status = ''
    let diff = posCase[posCase.length - 1] - posCase[posCase.length - 2]
    status =
      (diff >= 0 ? 'Tăng ' : 'Giảm ') + Math.abs(diff) + ' ca so với hôm qua'

    setPositiveCaseDiffSubTxt(status)
  }

  const MenuItems = (props) => (
    <Box sx={props.sx} {...props}>
      <Button
        variant="outlined"
        onClick={() => setOpenRegisterModal(true)}
        endIcon={<AccountCircleOutlinedIcon />}
        sx={{ mr: 1 }}
      >
        Tạo thông tin
      </Button>
      <Button
        variant="outlined"
        onClick={() => setOpenLookupModal(true)}
        endIcon={<SearchIcon />}
        sx={{ mr: 1 }}
      >
        Tra cứu
      </Button>
      <Button
        variant="contained"
        onClick={() => setOpenPositiveDeclarationModal(true)}
        endIcon={<MedicalInformationIcon />}
        sx={{ mr: 1 }}
      >
        Khai báo F0
      </Button>
    </Box>
  )

  const handleSelectArticle = (data) => {
    setArticleModalData(data)
    setOpenArticleModal(true)
  }

  return (
    <>
      {openLookupModal && (
        <LookupModal handleClose={() => setOpenLookupModal(false)} />
      )}
      {openArticleModal && (
        <ArticleModal
          handleClose={() => setOpenArticleModal(false)}
          data={articleModalData}
        />
      )}
      {openRegisterModal && (
        <RegisterModal handleClose={() => setOpenRegisterModal(false)} />
      )}
      {openPositiveDeclarationModal && (
        <PositiveDeclarationModal
          handleClose={() => setOpenPositiveDeclarationModal(false)}
          handleOpenRegisterModal={() => setOpenRegisterModal(true)}
          handleOpenNegativeModal={() => {
            setOpenPositiveDeclarationModal(false)
            setOpenNegativeDeclarationModal(true)
          }}
        />
      )}
      {openNegativeDeclarationModal && (
        <NegativeDeclarationModal
          handleClose={() => setOpenNegativeDeclarationModal(false)}
          handleOpenRegisterModal={() => setOpenRegisterModal(true)}
          handleOpenPositiveModal={() => {
            setOpenNegativeDeclarationModal(false)
            setOpenPositiveDeclarationModal(true)
          }}
        />
      )}
      <Container maxWidth="xl">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
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
              <ToggleButton value="world">Thế giới</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        {areaSeleted === 'local' && (
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={4}>
              <Card
                title={'Số ca nhiễm'}
                text={pdStat.total}
                type="warning.main"
                subText={positiveCaseDiffSubTxt}
                sx={{
                  textAlign: 'center',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                title={'Số ca nặng'}
                text={pdStat.total_serious_case}
                type="error.main"
                subText={
                  'Chiếm ' +
                  Math.floor((pdStat.total_serious_case * 100) / pdStat.total) +
                  '%'
                }
                sx={{
                  textAlign: 'center',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                title={'Số ca khỏi'}
                text={pdStat.total_recovered}
                type="success.main"
                subText={
                  'Chiếm ' +
                  Math.floor((pdStat.total_recovered * 100) / pdStat.total) +
                  '%'
                }
                sx={{
                  textAlign: 'center',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <VaccinesOutlinedIcon />
                  <Typography variant="h6" marginLeft={1}>
                    Thống kê tiêm vắc xin
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
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
                  Tổng người đã tiêm: {injectionStat.total}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                {injectionStat.by_time && (
                  <Chart
                    options={{
                      ...PieChartInjection,
                      legend: {
                        ...PieChartInjection.legend,
                        formatter: function (seriesName, opts) {
                          return (
                            seriesName +
                            ' ' +
                            opts.w.globals.series[opts.seriesIndex] +
                            '%'
                          )
                        },
                      },
                    }}
                    series={injectionStat.by_time.time}
                    type="radialBar"
                    width={'100%'}
                    height={200}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <BarChartOutlinedIcon />
                  <Typography variant="h6" marginLeft={1}>
                    Biểu đồ số ca nhiễm
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {pdStat.by_date && (
                  <Chart
                    options={{
                      ...LineWithLabelsPositiveCase,
                      xaxis: {
                        categories: pdStat.by_date.dates,
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
                        data: pdStat.by_date.positive_case,
                      },
                      {
                        name: 'Triệu chứng nặng',
                        data: pdStat.by_date.serious_case,
                      },
                      {
                        name: 'Số ca khỏi',
                        data: pdStat.by_date.recovered_case,
                      },
                    ]}
                    width="100%"
                    height={200}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <QuizOutlinedIcon />
                  <Typography variant="h6" marginLeft={1}>
                    Các điểm khai báo y tế
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Map
                  markers={
                    locations &&
                    locations.map((location, index) => ({
                      position: location.position,
                      popup: location.name,
                    }))
                  }
                  style={{
                    height: '400px',
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CoronavirusOutlinedIcon />
                <Typography variant="h6" marginLeft={1}>
                  Những vị trí xuất hiện ca nhiễm
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <QuizOutlinedIcon />
                <Typography variant="h6">Các bài viết liên quan</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              container
              spacing={2}
              sx={{
                pb: 2,
                maxHeight: '35vh',
                overflow: 'auto',
              }}
            >
              {articles.map((article, i) => (
                <Grid key={i} item xs={12} md={6}>
                  <ListItemButton
                    onClick={() => handleSelectArticle(article)}
                    sx={{
                      boxShadow: 4,
                    }}
                  >
                    <ListItemText
                      primary={article.title}
                      secondary={
                        'Cập nhật lần cuối ' +
                        dateFormat(article.updated_at, 'dd/mm/yy')
                      }
                      sx={{
                        '.MuiTypography-root': {
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        },
                      }}
                    />
                    {article.pinned && <PushPinOutlinedIcon />}
                  </ListItemButton>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        {areaSeleted === 'world' && <WorldStat />}
        <Copyright />
      </Container>
    </>
  )
}
