import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

import Modal from '../../../components/Modal'
import Map from '../../../components/Map'

import { lookupHealthDeclaration } from '../../../api'

const HistoryModal = (props) => {
  const { user, handleClose } = props

  const [dateFilter, setDateFilter] = useState(3)

  const [declarations, setDeclaration] = useState([])

  useEffect(() => {
    const startDate = new Date()
    // Set date for filter
    startDate.setDate(startDate.getDate() - dateFilter)

    lookupHealthDeclaration({
      'user._id': user._id,
      created_at_between: {
        start: startDate,
        end: new Date(),
      },
    })
      .then((rs) => {
        setDeclaration(rs.data.data)
      })
      .catch((rs) => console.log(rs.response))
  }, [dateFilter])

  return (
    <Modal
      handleClose={handleClose}
      sx={{
        width: {
          lg: '60%',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Lịch sử khai báo của người dùng
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6">Trong</Typography>
            <FormControl sx={{ ml: 1, mr: 1 }}>
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                sx={{ fontSize: 'h6.fontSize' }}
              >
                <MenuItem value={1}>1 ngày</MenuItem>
                <MenuItem value={3}>3 ngày</MenuItem>
                <MenuItem value={7}>7 ngày</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h6">gần nhất</Typography>
          </Box>
          <Divider />
        </Grid>
        <Grid
          item
          container
          xs={12}
          spacing={2}
          sx={{
            maxHeight: '60vh',
            overflow: 'auto',
          }}
          justifyContent={'center'}
        >
          {declarations.map((declaration, index) => (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <Typography align="center" color="primary.main">
                {dateFormat(declaration.created_at, 'HH:MM TT dd/mm/yyyy')}
              </Typography>
              <Typography align="center">
                {declaration.location.name}
              </Typography>
              <Map
                style={{
                  width: '100%',
                  minHeight: '300px',
                }}
                center={[
                  declaration.location.position.lat,
                  declaration.location.position.lng,
                ]}
                markers={[
                  {
                    position: declaration.location.position,
                    popup: declaration.location.name,
                  },
                ]}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            {!declarations.length && (
              <Typography align="center" sx={{ fontStyle: 'italic' }}>
                Không có dữ liệu
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="text" onClick={handleClose}>
              Đóng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default HistoryModal
