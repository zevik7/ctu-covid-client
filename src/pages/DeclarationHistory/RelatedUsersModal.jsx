import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import Modal from '../../components/Modal'
import ViewModal from './ViewModal'

import { getHealthDeclaraions } from '../../api'

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// })

const RelatedUsersModal = (props) => {
  const { data, handleClose } = props

  const [seletedUser, setSelectedUser] = useState(null)

  const [timeFilterHour, setTimeFilterHour] = useState(1)

  const [relatedUsers, setRelatedUsers] = useState([])

  useEffect(() => {
    const endDate = new Date(data.created_at)
    // Set hour for filter
    endDate.setHours(endDate.getHours() + timeFilterHour)

    getHealthDeclaraions({
      'location._id': data.location._id,
      created_at_between: {
        start: data.created_at,
        end: endDate,
      },
    })
      .then((rs) => setRelatedUsers(rs.data.data))
      .catch((errors) => console.log(errors))
  }, [timeFilterHour])

  // Create Document Component
  // const MyDocument = () => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <View style={styles.section}>
  //         <Text>Section #1</Text>
  //       </View>
  //       <View style={styles.section}>
  //         <Text>Section #2</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // )

  return (
    <Modal
      handleClose={handleClose}
      sx={{
        width: {
          xl: '60%',
        },
      }}
    >
      {seletedUser && (
        <ViewModal
          hideBtns={true}
          data={seletedUser}
          handleClose={() => setSelectedUser(null)}
        />
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Danh s??ch ng?????i d??ng khai b??o t???i ?????a ??i???m n??y
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>Trong kho???ng th???i gian: </Typography>
            <FormControl sx={{ ml: 1, minWidth: 120 }}>
              <Select
                value={timeFilterHour}
                onChange={(e) => setTimeFilterHour(e.target.value)}
              >
                <MenuItem value={1}>1 gi???</MenuItem>
                <MenuItem value={4}>4 gi???</MenuItem>
                <MenuItem value={24}>M???t ng??y</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TableContainer
            sx={{
              maxHeight: '60vh',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>T??n</TableCell>
                  <TableCell>S??? ??i???n tho???i</TableCell>
                  <TableCell>?????a ch???</TableCell>
                  <TableCell>V??o l??c</TableCell>
                  <TableCell>Thao t??c</TableCell>
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
                    <TableCell>{relatedUser.user.phone}</TableCell>
                    <TableCell>{relatedUser.user.address}</TableCell>
                    <TableCell>
                      {dateFormat(
                        relatedUser.created_at,
                        'HH:MM TT dd-mm-yyyy'
                      )}
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
        {!relatedUsers.length && (
          <Grid item xs={12}>
            <Typography align="center" sx={{ fontStyle: 'italic' }}>
              Kh??ng c?? d??? li???u
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pt: 1,
              borderTop: 1,
              borderColor: 'grey.500',
            }}
          >
            {/* <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
              }
            </PDFDownloadLink> */}
            <Button variant="text" onClick={handleClose}>
              ????ng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default RelatedUsersModal
