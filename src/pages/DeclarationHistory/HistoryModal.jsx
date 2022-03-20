import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import dateFormat from 'dateformat'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

import Modal from '../../components/Modal'
import Map from '../../components/Map'
import ViewModal from './ViewModal'

import { getHealthDeclaraions } from '../../api'

const HistoryModal = (props) => {
  const { data, handleClose } = props

  const [lessDayFilter, setLessDayFilter] = useState(3)

  const [declarations, setDeclaration] = useState([])

  useEffect(() => {
    const startDate = new Date()
    // Set hour for filter
    startDate.setDate(startDate.getDate() - lessDayFilter)

    getHealthDeclaraions({
      'user._id': data.user._id,
      created_at_between: {
        start: startDate,
        end: new Date(),
      },
    })
      .then((rs) => {
        setDeclaration(rs.data.data)
      })
      .catch((rs) => console.log(rs.response))
  }, [lessDayFilter])

  return (
    <Modal handleClose={handleClose}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography variant="h6" align="center">
            Lịch sử khai báo của người dùng
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography variant="subtitle1">Trong khoảng thời gian:</Typography>
            <FormControl sx={{ ml: 1 }}>
              <Select
                value={lessDayFilter}
                onChange={(e) => setLessDayFilter(e.target.value)}
              >
                <MenuItem value={1}>1 ngày</MenuItem>
                <MenuItem value={3}>3 ngày</MenuItem>
                <MenuItem value={7}>7 ngày</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider />
        </Grid>
        <Grid
          item
          container
          md={12}
          spacing={2}
          sx={{
            minWidth: '1000px',
            maxHeight: '60vh',
            overflow: 'auto',
          }}
        >
          {declarations.map((declaration, index) => (
            <Grid key={index} item md={4}>
              <Typography
                variant="subtitle1"
                component="div"
                align="center"
                color="primary.light"
              >
                {dateFormat(declaration.created_at, 'dd/mm/yyyy')}
              </Typography>
              <Typography variant="subtitle1" component="div" align="center">
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
        </Grid>
        <Grid item md={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pt: 1,
              borderTop: 1,
              borderColor: 'grey.500',
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
