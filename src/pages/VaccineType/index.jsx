import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import TableToolbar from '../../components/TableToolbar'
import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import { getVaccineTypes, destroyVaccineTypes } from '../../api'

import Modal from './Modal'

const tableHeadCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Họ tên',
  },
  {
    id: 'country',
    numeric: false,
    label: 'Nước sản xuất',
  },
  {
    id: 'description',
    numeric: false,
    label: 'Mô tả',
  },
]

const handleRenderTableRow = (row) => (
  <>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.country}</TableCell>
    <TableCell>{row.description || 'Chưa có mô tả'}</TableCell>
  </>
)

const VaccineType = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [selected, setSelected] = useState([])

  const callApi = (page, rowsPerPage) => {
    getVaccineTypes({
      currentPage: page,
      perPage: rowsPerPage,
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
    destroyVaccineTypes({
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
    callApi(+newPage + 1, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event) => {
    callApi(page, +event.target.value)
  }

  return (
    <Paper>
      {openModal && (
        <Modal
          data={modalData}
          handleClose={handleCloseModal}
          updateRows={() => callApi(page, rowsPerPage)}
        />
      )}
      <TableToolbar
        title="Danh sách loại vắc-xin"
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
    </Paper>
  )
}

export default VaccineType
