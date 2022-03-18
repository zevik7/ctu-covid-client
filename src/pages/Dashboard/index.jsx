import { useState } from 'react'
import { Container, Grid, Paper, Typography, Box } from '@mui/material'

import Chart from 'react-apexcharts'

import Deposits from '../../components/Deposits'
import Map from '../../components/Map'

const Dashboard = () => {
  const [pieChart, setPieChart] = useState({
    series: [990, 31022, 23100],
    options: {
      chart: {
        width: 480,
        type: 'pie',
      },
      labels: ['Mũi một', 'Mũi hai', 'Mũi ba'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  })

  const [lineChart, setLineChart] = useState({
    series: [
      {
        name: [
          '12/03/2022',
          '13/03/2022',
          '14/03/2022',
          '15/03/2022',
          '16/03/2022',
          '17/03/2022',
        ],
        data: [
          [1324508400000, 34],
          [1324594800000, 54],
          [1326236400000, 43],
          [1327236400000, 23],
          [1328236400000, 99],
          [1329236400000, 78],
          [1329936400000, 13],
        ],
      },
    ],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Khai báo',
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0)
          },
        },
        title: {
          text: 'Lượt',
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0)
          },
        },
      },
    },
  })

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Grid container spacing={3}>
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
              Số lượt khai báo những ngày qua
            </Typography>
            <Chart
              options={lineChart.options}
              series={lineChart.series}
              type="area"
              height={480}
            />
          </Grid>
          <Grid item md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
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
                type="pie"
                width={480}
              />
            </Box>
          </Grid>
          <Grid item md={12}>
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
              Các địa điểm được khai báo nhiều nhất
            </Typography>
            <Map
              style={{
                height: '300px',
                padding: '10px',
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Dashboard
