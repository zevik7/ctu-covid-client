import { useState, useEffect, useMemo } from 'react'
import Chart from 'react-apexcharts'
import dateFormat from 'dateformat'
import { sortBy } from 'lodash'

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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import MenuIcon from '@mui/icons-material/Menu'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined'

import Card from '../../../components/Card'
import { ZoomableTimePositiveCase } from '../../../components/ChartOptions'
import {
  getCountries,
  getReportByCountry,
  getSummary,
} from '../../../api/PostmanCovid'

const WorldStat = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState()
  const [report, setReport] = useState()

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res
      const countries = sortBy(data, 'Country')
      setCountries(countries)
      const vn = countries.find((country, i) => country.Slug === 'vietnam')
      setSelectedCountry(vn)
    })
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      // Call API
      getReportByCountry(selectedCountry.Slug).then((res) => {
        setReport(res.data)
      })
    }
  }, [selectedCountry])

  const handleSelectChange = (value) => {
    setSelectedCountry(value)
  }

  const reportMapped = useMemo(() => {
    if (report) {
      const reportStat = {
        dates: [],
        confirmed: [],
        deaths: [],
      }
      report.forEach((el, i) => {
        reportStat.dates.push(el.Date)
        reportStat.confirmed.push([new Date(el.Date).getTime(), el.Confirmed])
        reportStat.deaths.push(el.Deaths)
      })
      return reportStat
    }
  }, [report])

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 2 }}
    >
      <Grid item xs={12} container justifyContent={'center'}>
        {countries.length > 0 && selectedCountry && (
          <Autocomplete
            sx={{
              width: {
                md: '20%',
                xs: '50%',
              },
            }}
            required
            fullWidth
            id="search-field"
            autoFocus
            disableClearable={true}
            value={selectedCountry}
            onChange={(event, newValue) => {
              handleSelectChange(newValue)
            }}
            options={countries}
            isOptionEqualToValue={(option, value) => option.Slug === value.Slug}
            getOptionLabel={(option) => option.Country}
            renderInput={(params) => (
              <TextField {...params} label="Chọn quốc gia" />
            )}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card
          title={'Số ca nhiễm'}
          text={reportMapped && reportMapped.confirmed.at(-1)[1]}
          type="warning.main"
          sx={{
            textAlign: 'center',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card
          title={'Số ca tử vong'}
          text={reportMapped && reportMapped.deaths.at(-1)}
          type="error.main"
          sx={{
            textAlign: 'center',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        {report && (
          <Chart
            width="100%"
            height={500}
            options={{
              ...ZoomableTimePositiveCase,
            }}
            series={[
              {
                name: 'Số ca nhiễm',
                data: reportMapped.confirmed,
              },
            ]}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default WorldStat
