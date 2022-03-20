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

import Modal from '../../components/Modal'
import ViewModal from './ViewModal'

import { getHealthDeclaraions } from '../../api'

const RelatedUsersModal = (props) => {
  const { data, handleClose, handleOpenViewModal } = props

  const [seletedUser, setSelectedUser] = useState(null)

  const [timeFilter, setTimeFilter] = useState(1)

  const [relatedUsers, setRelatedUsers] = useState([])

  useEffect(() => {
    const filterDate = new Date(data.created_at)
    // Set hour for filter
    filterDate.setHours(filterDate.getHours() + timeFilter)

    getHealthDeclaraions({
      'location._id': data.location._id,
      created_at_lower: filterDate,
    }).then((rs) => setRelatedUsers(rs.data.data))
  }, [timeFilter])

  return (
    <Modal handleClose={handleClose}>
      {seletedUser && (
        <ViewModal
          hideBtns={true}
          data={seletedUser}
          handleClose={() => setSelectedUser(null)}
        />
      )}
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography variant="h6" align="center">
            Danh sách những người khai báo tại địa điểm này
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Trong khoảng thời gian: </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <MenuItem value={1}>1 giờ</MenuItem>
                <MenuItem value={4}>4 giờ</MenuItem>
                <MenuItem value={24}>Một ngày</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={12}>
          <TableContainer
            sx={{
              maxHeight: '60vh',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell>Thời điểm khai báo</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {relatedUsers.map((relatedUser, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {relatedUser.user.name}
                    </TableCell>
                    <TableCell>
                      {dateFormat(relatedUser.created_at, 'hh:mm dd-mm-yyyy')}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={() => {
                          setSelectedUser(relatedUser)
                        }}
                      >
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default RelatedUsersModal
