import { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, Box } from '@mui/material'

import Chart from 'react-apexcharts'

import Deposits from '../../components/Deposits'
import Map from '../../components/Map'
import AlertDialog from '../../components/AlertDialog'
import LineChart from '../../components/Chart/LineChart'
import PieChart from '../../components/Chart/PieChart'

import { getStats, getPostitiveDeclarations } from '../../api'

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

const Dashboard = () => {
  const [positiveDeclaByDates, setPositiveDeclaByDates] = useState([])
  const [positiveDecla, setPositiveDecla] = useState([])

  useEffect(() => {
    getStats().then((rs) => {
      setPositiveDeclaByDates(rs.data.statDates)
    })

    getPostitiveDeclarations().then((rs) => {
      setPositiveDecla(rs.data.data)
    })
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Typography
          sx={{
            mt: 2,
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Số ca nhiễm những ngày qua
        </Typography>
        <LineChart
          name="Số ca nhiễm"
          data={positiveDeclaByDates}
          type="area"
          height={'50%'}
        />
        <Typography
          sx={{
            flex: '1 1 100%',
            mt: 2,
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Số lượt khai báo những ngày qua
        </Typography>
        <LineChart
          name="Số lượt khai báo"
          data={positiveDeclaByDates}
          type="area"
          height={'50%'}
        />
      </Grid>

      <Grid item md={6}>
        <Typography
          sx={{
            flex: '1 1 100%',
            mt: 2,
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Thống kê tiêm vắc-xin
        </Typography>
        <Chart
          options={pieChart.options}
          series={pieChart.series}
          type="radialBar"
          height={500}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{
            flex: '1 1 100%',
            mt: 2,
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Các vị trí F0 cách ly
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
    </Grid>
  )
}

export default Dashboard
