import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import TableToolbar from '../../components/TableToolbar'
import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import Modal from '../../components/Modal'
import { getInjections, destroyInjections } from '../../api'

import EditForm from './EditForm'
import AddForm from './AddForm'

const tableHeadCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Họ tên',
  },
  {
    id: 'phone',
    numeric: false,
    label: 'Số điện thoại',
  },
  {
    id: 'vaccine_type_name',
    numeric: false,
    label: 'Loại vắc-xin',
  },
  {
    id: 'injection_date',
    numeric: false,
    label: 'Ngày tiêm',
  },
]

const handleRenderTableRow = (row) => (
  <>
    <TableCell>{row.user.name}</TableCell>
    <TableCell>{row.user.phone}</TableCell>
    <TableCell>{row.vaccine_type.name}</TableCell>
    <TableCell>{dateFormat(row.injection_date, 'dd/mm/yyyy')}</TableCell>
  </>
)

const User = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [tableRowsPerPage, setTableRowsPerPage] = useState(20)
  const [openEditForm, setOpenEditForm] = useState(false)
  const [openAddForm, setOpenAddForm] = useState(false)
  const [editFormData, setEditFormData] = useState({})
  const [selected, setSelected] = useState([])

  const callApi = () => {
    getInjections({
      currentPage: page,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const setAllState = (apiData) => {
    const { data, currentPage, perPage, count } = apiData
    setTableBodyCells(data)
    setCount(count)
    setPage(currentPage)
    setTableRowsPerPage(perPage)
  }

  const handleCloseEditForm = () => setOpenEditForm(false)

  const handleOpenEditForm = (data) => {
    setOpenEditForm(true)
    setEditFormData(data)
  }

  const handleCloseAddForm = () => setOpenAddForm(false)

  const handleOpenAddForm = () => setOpenAddForm(true)

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
    destroyInjections({
      ids: [...selected],
    }).then((rs) => {
      setSelected([])
      callApi()
    })
  }

  useEffect(() => {
    getInjections({
      currentPage: page,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }, [openEditForm, openAddForm])

  const handleChangePage = (event, newPage) => {
    getInjections({
      currentPage: +newPage + 1,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const handleChangeRowsPerPage = (event) => {
    getInjections({
      currentPage: page,
      perPage: parseInt(event.target.value, 10),
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Modal open={openEditForm} handleClose={handleCloseEditForm}>
          <EditForm data={editFormData} handleClose={handleCloseEditForm} />
        </Modal>
        <Modal open={openAddForm} handleClose={handleCloseAddForm}>
          <AddForm handleClose={handleCloseAddForm} />
        </Modal>
        <TableToolbar
          title="Danh sách tiêm chủng"
          numSelected={selected.length}
          handleOpenModal={handleOpenAddForm}
          handleDeleteBtn={handleDeleteTableRows}
          selected={selected}
        />
        <Table
          headCells={tableHeadCells}
          bodyCells={tableBodyCells}
          selected={selected}
          handleRenderRow={handleRenderTableRow}
          handleOpenModal={handleOpenEditForm}
          handleSelectClick={handleTableRowClick}
          handleSelectAllClick={handleTableRowClickAll}
        />
        <TablePagination
          count={count}
          page={page}
          rowsPerPage={tableRowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default User
