import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper, Grid, TableCell } from '@mui/material'

import TableToolbar from '../../components/TableToolbar'
import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import Modal from '../../components/Modal'
import { getLocations, destroyLocation } from '../../api'
import ModalForm from './ModalForm'
import Map from '../../components/Map'

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
  const [totalPage, setTotalPage] = useState(0)
  const [page, setPage] = useState(1)
  const [tableRowsPerPage, setTableRowsPerPage] = useState(20)
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [selected, setSelected] = useState([])

  const callApi = () => {
    getLocations({
      currentPage: page,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const setAllState = (apiData) => {
    const { data, currentPage, perPage, totalPage } = apiData
    setTableBodyCells(data)
    setTotalPage(totalPage)
    setPage(currentPage)
    setTableRowsPerPage(perPage)
  }

  const handleCloseModal = () => setOpenModal(false)

  const handleOpenModal = (data) => {
    setOpenModal(true)
    setModalData(data)
  }

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
    destroyLocation({
      ids: [...selected],
    }).then((rs) => {
      setSelected([])
      callApi()
    })
  }

  useEffect(() => {
    getLocations({
      currentPage: page,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }, [openModal])

  const handleChangePage = (event, newPage) => {
    getLocations({
      currentPage: +newPage + 1,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const handleChangeRowsPerPage = (event) => {
    getLocations({
      currentPage: page,
      perPage: parseInt(event.target.value, 10),
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Modal open={openModal} handleClose={handleCloseModal}>
          <ModalForm data={modalData} handleClose={handleCloseModal} />
        </Modal>
        <Grid
          container
          spacing={2}
          sx={{
            minHeight: '80vh',
          }}
        >
          <Grid item md={6}>
            <Map />
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
                handleOpenModal={handleOpenModal}
                handleDeleteBtn={handleDeleteTableRows}
                selected={selected}
              />
              <Table
                headCells={tableHeadCells}
                bodyCells={tableBodyCells}
                selected={selected}
                handleRenderRow={handleRenderTableRow}
                handleOpenModal={handleOpenModal}
                handleSelectClick={handleTableRowClick}
                handleSelectAllClick={handleTableRowClickAll}
              />
              <TablePagination
                count={totalPage}
                page={page}
                rowsPerPage={tableRowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default User
