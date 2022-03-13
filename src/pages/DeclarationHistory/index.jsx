import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper, Grid, TableCell, Typography } from '@mui/material'

import { getHealthDeclaraions, destroyLocations } from '../../api'

import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import Modal from '../../components/Modal'
import ViewForm from './ViewForm'
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
  const shapeCircleStyles = { borderRadius: '50%' }
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
  const [tableRowsPerPage, setTableRowsPerPage] = useState(20)

  const [openViewModal, setOpenViewModal] = useState(false)
  const [viewFormData, setViewFormData] = useState({})

  const callApi = () => {
    getHealthDeclaraions({
      currentPage: page,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const setAllState = (apiData) => {
    const { data, currentPage, perPage, count } = apiData
    setData(data)
    setCount(count)
    setPage(currentPage)
    setTableRowsPerPage(+perPage)
  }

  const handleCloseViewModal = () => setOpenViewModal(false)

  const handleOpenViewModal = (data) => {
    setOpenViewModal(true)
    setViewFormData(data)
  }

  useEffect(() => {
    callApi()
  }, [])

  const handleChangePage = (event, newPage) => {
    getHealthDeclaraions({
      currentPage: +newPage + 1,
      perPage: +tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const handleChangeRowsPerPage = (event) => {
    getHealthDeclaraions({
      currentPage: +page,
      perPage: +event.target.value,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Modal open={openViewModal} handleClose={handleCloseViewModal}>
          <ViewForm
            data={viewFormData}
            handleClose={handleCloseViewModal}
            handleOpenViewModal={handleOpenViewModal}
          />
        </Modal>
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
              rowsPerPage={tableRowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default DeclarationHistory
