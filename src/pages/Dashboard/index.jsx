import { useState, useEffect, useCallback } from 'react'
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
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined'

import Map from '../../components/Map'
import Copyright from '../../components/Copyright'
import Logo from '../../components/Logo'
import Card from '../../components/Card'
import {
  LineWithLabelsPositiveCase,
  PieChartInjection,
  ZoomableTimeHealthDeclaCount,
} from '../../components/ChartOptions'

import {
  getLocations,
  getPDGeneralStat,
  getPostitiveDeclarations,
  getInjectionGeneralStat,
  getHDGeneralStat,
} from '../../api'

export default function Home() {
  const [positiveDecla, setPositiveDecla] = useState([]) // For Map
  const [pdStat, setPDStat] = useState({})
  const [injectionStat, setInjectionStat] = useState({})
  const [positiveCaseDiffSubTxt, setPositiveCaseDiffSubTxt] = useState('')
  const [hdStat, setHdStat] = useState('')
  const [locations, setLocations] = useState()
  const [selectedLocation, setSelectedLocation] = useState({})

  useEffect(() => {
    getPDGeneralStat()
      .then((rs) => {
        setPDStat(rs.data)
        calTotalCaseSubText(rs.data.by_date.positive_case)
      })
      .catch((err) => console.log(err))

    getPostitiveDeclarations().then((rs) => {
      setPositiveDecla(rs.data.data)
    })

    getInjectionGeneralStat().then((rs) => {
      setInjectionStat(rs.data)
    })

    getHDGeneralStat().then((rs) => {
      setHdStat(rs.data)
    })

    getLocations().then((rs) => {
      const locationOptions = rs.data.data
      const allOption = {
        name: 'Tất cả',
      }
      locationOptions.unshift(allOption)
      setLocations(locationOptions)
      setSelectedLocation(allOption)
    })
  }, [])

  useEffect(() => {
    getHDGeneralStat({
      location: selectedLocation._id,
    })
      .then((rs) => {
        setHdStat(rs.data)
      })
      .catch((err) => console.log(err))
  }, [selectedLocation])

  const handleSelectChange = (newValue) => {
    setSelectedLocation(newValue)
  }

  const calTotalCaseSubText = useCallback(
    (posCase) => {
      if (!posCase) return

      let status = ''
      let diff = posCase[posCase.length - 1] - posCase[posCase.length - 2]
      status =
        (diff >= 0 ? 'Tăng ' : 'Giảm ') + Math.abs(diff) + ' ca so với hôm qua'

      setPositiveCaseDiffSubTxt(status)
    },
    [pdStat]
  )

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ pt: 2.5, pl: 2, pr: 2 }}
      >
        {/* Cards */}
        <Grid item xs={12} sm={4}>
          <Card
            title={'Số ca nhiễm'}
            text={pdStat.total}
            type="warning.main"
            subText={positiveCaseDiffSubTxt}
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
          />
        </Grid>
        {/* End cards */}
        <Grid item xs={12} lg={6} container spacing={1}>
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
            {injectionStat.by_time && (
              <Typography
                variant="h5"
                align="center"
                color={'success.main'}
                sx={{
                  mt: 1,
                }}
              >
                Tổng người đã tiêm: {injectionStat.total}
                <Typography
                  variant="subtitle2"
                  color={'success.main'}
                  component="div"
                >
                  Chiếm{' '}
                  {Math.floor(
                    (injectionStat.total * 100) / injectionStat.total_user
                  )}
                  % người dùng
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
        <Grid item xs={12} lg={6} container spacing={1}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <QuizOutlinedIcon />
              <Typography variant="h6" marginLeft={1}>
                Biểu đồ số lượt khai báo
              </Typography>
            </Box>
          </Grid>
          {locations && selectedLocation.name && (
            <Grid item xs={12}>
              <Autocomplete
                required
                fullWidth
                id="search-field"
                autoFocus
                disableClearable={true}
                value={selectedLocation}
                onChange={(event, newValue) => {
                  handleSelectChange(newValue)
                }}
                options={locations}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Chọn địa điểm" />
                )}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            {hdStat && (
              <Chart
                width="100%"
                height={400}
                options={{
                  ...ZoomableTimeHealthDeclaCount,
                }}
                series={[
                  {
                    name: 'Số ca nhiễm',
                    data: hdStat.count_by_timestamp,
                  },
                ]}
              />
            )}
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
      </Grid>
    </>
  )
}
