import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import TableToolbar from '../../components/TableToolbar'
import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import Modal from '../../components/Modal'
import { getUsers, destroyUsers } from '../../api'
import ModalForm from './ModalForm'

const tableHeadCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Họ tên',
  },
  {
    id: 'gender',
    numeric: false,
    label: 'Giới tính',
  },
  {
    id: 'birthday',
    numeric: false,
    label: 'Ngày sinh',
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email',
  },
  {
    id: 'phone',
    numeric: false,
    label: 'Số điện thoại',
  },
]

const handleRenderTableRow = (row) => (
  <>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.gender}</TableCell>
    <TableCell>{dateFormat(row.birthday, 'dd/mm/yyyy')}</TableCell>
    <TableCell>{row.email}</TableCell>
    <TableCell>{row.phone}</TableCell>
  </>
)

const User = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [tableRowsPerPage, setTableRowsPerPage] = useState(20)
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [selected, setSelected] = useState([])

  const callApi = () => {
    getUsers({
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
    destroyUsers({
      ids: [...selected],
    }).then((rs) => {
      setSelected([])
      callApi()
    })
  }

  useEffect(() => {
    getUsers({
      currentPage: page,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }, [openModal])

  const handleChangePage = (event, newPage) => {
    getUsers({
      currentPage: +newPage + 1,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const handleChangeRowsPerPage = (event) => {
    getUsers({
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
        <TableToolbar
          title="Danh sách người dùng"
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
