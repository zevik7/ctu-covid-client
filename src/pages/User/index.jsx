import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Paper } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import TableToolbar from '../../components/TableToolbar'
import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import { getUsers, destroyUsers } from '../../api'
import Modal from './Modal'

const tableHeadCells = [
  {
    id: 'name',
    label: 'Họ tên',
  },
  {
    id: 'gender',
    label: 'Giới tính',
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'phone',
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
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [selected, setSelected] = useState([])

  useEffect(() => {
    callApi(page, rowsPerPage)
  }, [])

  const callApi = (page, perPage) => {
    getUsers({
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
    }).then(() => {
      setSelected([])
      callApi(page, rowsPerPage)
    })
  }

  const handleChangePage = (event, newPage) => {
    setSelected([])
    callApi(+newPage + 1, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setSelected([])
    callApi(page, +event.target.value)
  }

  return (
    <>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleCloseModal}
          data={modalData}
          updateRows={() => callApi(page, rowsPerPage)}
        />
      )}
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
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

export default User
