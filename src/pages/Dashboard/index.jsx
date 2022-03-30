import { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, Box } from '@mui/material'

import Chart from 'react-apexcharts'

import Deposits from '../../components/Deposits'
import Map from '../../components/Map'
import AlertDialog from '../../components/AlertDialog'

import { getPDStatByDates, getPostitiveDeclarations } from '../../api'

const Dashboard = () => {
  const [positiveDeclaByDates, setPositiveDeclaByDates] = useState([])
  const [positiveDecla, setPositiveDecla] = useState([])

  useEffect(() => {
    getPDStatByDates().then((rs) => {
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
