import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper, Grid, TableCell } from '@mui/material'

import { getLocations, destroyLocations } from '../../api'

import TableToolbar from '../../components/TableToolbar'
import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import Modal from '../../components/Modal'
import EditModal from './EditModal'
import Map from '../../components/Map'
import AddModal from './AddModal'

const tableHeadCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Địa chỉ',
  },
  {
    id: 'created_by_name',
    numeric: false,
    label: 'Người tạo',
  },
  {
    id: 'updated_at',
    numeric: false,
    label: 'Cập nhật vào',
  },
]

const handleRenderTableRow = (row) => (
  <>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.created_by.name}</TableCell>
    <TableCell>{dateFormat(row.updated_at, 'dd/mm/yyyy')}</TableCell>
  </>
)

const User = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [editModalData, setEditModalData] = useState({})
  const [selected, setSelected] = useState([])

  useEffect(() => {
    callApi(page, rowsPerPage)
  }, [])

  const callApi = (page, perPage) => {
    getLocations({
      currentPage: page,
      perPage,
    }).then((rs) => {
      const { data, currentPage, perPage, count } = rs.data
      setTableBodyCells(data)
      setCount(count)
      setPage(currentPage)
      setRowsPerPage(perPage)
    })
  }

  const handleCloseEditModal = () => setOpenEditModal(false)

  const handleOpenEditModal = (data) => {
    setOpenEditModal(true)
    setEditModalData(data)
  }

  const handleCloseAddModal = () => setOpenAddModal(false)

  const handleOpenAddModal = () => setOpenAddModal(true)

  const handleTableRowClick = (event, _id) => {
    event.stopPropagation()

    const selectedIndex = selected.indexOf(_id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleTableRowClickAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableBodyCells.map((n) => n._id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleDeleteTableRows = (selected) => {
    destroyLocations({
      ids: [...selected],
    }).then((rs) => {
      setSelected([])
      callApi()
    })
  }

  const handleChangePage = (event, newPage) => {
    callApi(+newPage + 1, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event) => {
    callApi(page, +event.target.value)
  }

  return (
    <Paper>
      {openEditModal && (
        <EditModal
          open={openEditModal}
          data={editModalData}
          handleClose={handleCloseEditModal}
          updateRows={() => callApi(page, rowsPerPage)}
        />
      )}
      {openAddModal && (
        <AddModal
          open={openAddModal}
          data={editModalData}
          handleClose={handleCloseAddModal}
          updateRows={() => callApi(page, rowsPerPage)}
        />
      )}
      <Grid
        container
        sx={{
          minHeight: '80vh',
        }}
      >
        <Grid item md={6}>
          <Map
            markers={tableBodyCells.map((location, index) => ({
              position: location.position,
              popup: '',
            }))}
          />
        </Grid>
        <Grid item md={6}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <TableToolbar
              title="Danh sách các địa điểm khai báo"
              numSelected={selected.length}
              handleOpenModal={handleOpenAddModal}
              handleDeleteBtn={handleDeleteTableRows}
              selected={selected}
            />
            <Table
              headCells={tableHeadCells}
              bodyCells={tableBodyCells}
              selected={selected}
              handleRenderRow={handleRenderTableRow}
              handleOpenModal={handleOpenEditModal}
              handleSelectClick={handleTableRowClick}
              handleSelectAllClick={handleTableRowClickAll}
            />
            <TablePagination
              count={count}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default User
