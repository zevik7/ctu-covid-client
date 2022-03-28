import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import TableToolbar from '../../components/TableToolbar'
import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import { getInjections, destroyInjections } from '../../api'

import EditModal from './EditModal'
import AddModal from './AddModal'

const tableHeadCells = [
  {
    id: 'name',
    label: 'Họ tên',
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
  },
  {
    id: 'vaccine_type_name',
    label: 'Loại vắc-xin',
  },
  {
    id: 'time',
    label: 'Mũi thứ',
  },
  {
    id: 'injection_date',
    label: 'Ngày tiêm',
  },
]

const handleRenderTableRow = (row) => (
  <>
    <TableCell>{row.user.name}</TableCell>
    <TableCell>{row.user.phone}</TableCell>
    <TableCell>{row.vaccine_type.name}</TableCell>
    <TableCell>{row.time}</TableCell>
    <TableCell>{dateFormat(row.injection_date, 'dd/mm/yyyy')}</TableCell>
  </>
)

const Injection = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [selected, setSelected] = useState([])

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [editModalData, setEditModalData] = useState({})

  const callApi = (page, perPage) => {
    getInjections({
      currentPage: page,
      perPage: perPage,
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
    destroyInjections({
      ids: [...selected],
    }).then((rs) => {
      setSelected([])
      callApi(page, rowsPerPage)
    })
  }

  useEffect(() => {
    callApi(page, rowsPerPage)
  }, [])

  const handleChangePage = (event, newPage) => {
    setSelected([])
    callApi(+newPage + 1, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setSelected([])
    callApi(page, +event.target.value)
  }

  return (
    <Paper>
      {openEditModal && (
        <EditModal
          data={editModalData}
          handleClose={handleCloseEditModal}
          updateRows={() => callApi(page, rowsPerPage)}
        />
      )}
      {openAddModal && (
        <AddModal
          handleClose={handleCloseAddModal}
          updateRows={() => callApi(page, rowsPerPage)}
        />
      )}
      <TableToolbar
        title="Danh sách tiêm chủng"
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
    </Paper>
  )
}

export default Injection
