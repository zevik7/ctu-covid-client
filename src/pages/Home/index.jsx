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
import AddInjectionModal from './AddInjectionModal'
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
  const [openAddInjectionModal, setOpenAddInjectionModal] = useState(false)
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
      (diff >= 0 ? 'T??ng ' : 'Gi???m ') + Math.abs(diff) + ' ca so v???i h??m qua'

    setPositiveCaseDiffSubTxt(status)
  }

  const MenuItems = (props) => (
    <Box sx={props.sx} {...props}>
      <Button
        variant="outlined"
        onClick={() => setOpenLookupModal(true)}
        endIcon={<SearchIcon />}
        sx={{ mr: 1 }}
      >
        Tra c???u
      </Button>
      <Button
        variant="outlined"
        onClick={() => setOpenRegisterModal(true)}
        endIcon={<AccountCircleOutlinedIcon />}
        sx={{ mr: 1 }}
      >
        ????ng k?? th??ng tin
      </Button>
      <Button
        variant="outlined"
        onClick={() => setOpenAddInjectionModal(true)}
        endIcon={<VaccinesOutlinedIcon />}
        sx={{ mr: 1 }}
      >
        Khai b??o ti??m ch???ng
      </Button>
      <Button
        variant="contained"
        onClick={() => setOpenPositiveDeclarationModal(true)}
        endIcon={<MedicalInformationIcon />}
        sx={{ mr: 1 }}
      >
        Khai b??o F0
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
      {openAddInjectionModal && (
        <AddInjectionModal
          handleClose={() => setOpenAddInjectionModal(false)}
        />
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
                  Danh s??ch thao t??c
                </Typography>
                <Divider />
                <MenuItems
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: 250,
                    height: 180,
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
            {/* <Typography variant="h6" sx={{ mr: 1, color: 'text.secondary' }}>
              S??? li???u t???i
            </Typography> */}
            {/* <ToggleButtonGroup
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
              <ToggleButton value="local">Khu v???c</ToggleButton>
              <ToggleButton value="world">Th??? gi???i</ToggleButton>
            </ToggleButtonGroup> */}
          </Grid>
        </Grid>
        {areaSeleted === 'local' && (
          <Grid container spacing={2} justifyContent="space-between">
            {/* Cards */}
            <Grid item xs={12} sm={4}>
              <Card
                title={'S??? ca nhi???m'}
                text={pdStat.total}
                type="warning.main"
                subText={positiveCaseDiffSubTxt}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                title={'S??? ca n???ng'}
                text={pdStat.total_serious_case}
                type="error.main"
                subText={
                  'Chi???m ' +
                  Math.floor((pdStat.total_serious_case * 100) / pdStat.total) +
                  '%'
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                title={'S??? ca kh???i'}
                text={pdStat.total_recovered}
                type="success.main"
                subText={
                  'Chi???m ' +
                  Math.floor((pdStat.total_recovered * 100) / pdStat.total) +
                  '%'
                }
              />
            </Grid>
            {/* End cards */}
            <Grid item xs={12} md={6} container spacing={1}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <VaccinesOutlinedIcon />
                  <Typography variant="h6" marginLeft={1}>
                    Th???ng k?? ti??m v???c xin
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
                {injectionStat.by_time && (
                  <Typography
                    variant="h5"
                    align="center"
                    color={'success.main'}
                    sx={{
                      mt: 1,
                    }}
                  >
                    T???ng ng?????i ???? ti??m: {injectionStat.total}
                    <Typography
                      variant="subtitle2"
                      color={'success.main'}
                      component="div"
                    >
                      Chi???m{' '}
                      {Math.floor(
                        (injectionStat.total * 100) / injectionStat.total_user
                      )}
                      % ng?????i d??ng
                    </Typography>
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={7}>
                {injectionStat.by_time && (
                  <Chart
                    options={{
                      ...PieChartInjection,
                    }}
                    series={injectionStat.by_time.data.map((time) =>
                      Math.floor((time * 100) / injectionStat.total_user)
                    )}
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
                    Bi???u ????? s??? ca nhi???m
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
                        name: 'S??? ca nhi???m',
                        data: pdStat.by_date.positive_case,
                      },
                      {
                        name: 'Tri???u ch???ng n???ng',
                        data: pdStat.by_date.serious_case,
                      },
                      {
                        name: 'S??? ca kh???i',
                        data: pdStat.by_date.recovered_case,
                      },
                    ]}
                    width="100%"
                    height={200}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container spacing={1}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <QuizOutlinedIcon />
                  <Typography variant="h6" marginLeft={1}>
                    C??c ??i???m khai b??o y t???
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
                  Nh???ng v??? tr?? xu???t hi???n ca nhi???m
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
                <Typography variant="h6" marginLeft={1}>
                  H?????ng d???n y t???
                </Typography>
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
                      boxShadow: 2,
                    }}
                  >
                    <ListItemText
                      primary={article.title}
                      secondary={
                        'C???p nh???t l???n cu???i ' +
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
