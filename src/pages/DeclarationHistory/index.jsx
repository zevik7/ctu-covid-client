import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper, Grid, TableCell, Typography } from '@mui/material'

import { getHealthDeclaraions, destroyLocations } from '../../api'

import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import ViewModal from './ViewModal'
import HistoryModal from './HistoryModal'
import RelatedUsersModal from './RelatedUsersModal'
import NoteBar from './NoteBar'

const tableHeadCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Địa chỉ',
  },
  {
    id: 'phone',
    numeric: false,
    label: 'Số điện thoại',
  },
  {
    id: 'location',
    numeric: false,
    label: 'Địa điểm',
  },
  {
    id: 'created_at',
    numeric: false,
    label: 'Ngày',
  },
  {
    id: 'status',
    numeric: false,
    label: 'Tình trạng',
  },
]

const handleRenderTableRow = (row) => {
  return (
    <>
      <TableCell>{row.user.name}</TableCell>
      <TableCell>{row.user.phone}</TableCell>
      <TableCell>{row.location.name}</TableCell>
      <TableCell>{dateFormat(row.created_at, 'dd/mm/yyyy')}</TableCell>
      <TableCell>
        {row.status.danger_area && (
          <Box
            component="div"
            sx={{
              display: 'inline-block',
              bgcolor: 'warning.light',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              mr: 1,
            }}
          ></Box>
        )}
        {row.status.symptom && (
          <Box
            component="div"
            sx={{
              display: 'inline-block',
              bgcolor: 'error.light',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              mr: 1,
            }}
          ></Box>
        )}
      </TableCell>
    </>
  )
}

const DeclarationHistory = () => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const [openViewModal, setOpenViewModal] = useState(false)
  const [viewModalData, setViewModalData] = useState({})

  const [openHistoryModal, setOpenHistoryModal] = useState(false)
  const [openRelatedUsersModal, setOpenRelatedUsersModal] = useState(false)

  const callApi = (page, perPage) => {
    getHealthDeclaraions({
      currentPage: page,
      perPage: perPage,
    }).then((rs) => {
      const { data, currentPage, perPage, count } = rs.data
      setData(data)
      setCount(count)
      setPage(currentPage)
      setRowsPerPage(perPage)
    })
  }

  const handleCloseViewModal = () => setOpenViewModal(false)

  const handleOpenViewModal = (data) => {
    setOpenViewModal(true)
    setViewModalData(data)
  }

  useEffect(() => {
    callApi(page, rowsPerPage)
  }, [])

  const handleChangePage = (event, newPage) => {
    callApi(+newPage + 1, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event) => {
    callApi(page, +event.target.value)
  }

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      {openViewModal && (
        <ViewModal
          data={viewModalData}
          handleClose={handleCloseViewModal}
          handleOpenRelatedUsersModal={() => setOpenRelatedUsersModal(true)}
          handleOpenHistoryModal={() => setOpenHistoryModal(true)}
        />
      )}
      {openRelatedUsersModal && (
        <RelatedUsersModal
          data={viewModalData}
          handleClose={() => setOpenRelatedUsersModal(false)}
          handleOpenViewModal={handleOpenViewModal}
        />
      )}
      {openHistoryModal && (
        <HistoryModal
          data={viewModalData}
          handleClose={() => setOpenHistoryModal(false)}
        />
      )}
      <Grid
        container
        spacing={2}
        sx={{
          minHeight: '80vh',
        }}
      >
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
            Lịch sử khai báo y tế
          </Typography>
          <NoteBar />
          <Table
            headCells={tableHeadCells}
            bodyCells={data}
            handleRenderRow={handleRenderTableRow}
            handleOpenModal={handleOpenViewModal}
            disabledCheckbox={true}
            selected={[]}
          />
          <TablePagination
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default DeclarationHistory
