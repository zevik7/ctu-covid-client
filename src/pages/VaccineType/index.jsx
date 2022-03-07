import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import TableToolbar from '../../components/TableToolbar'
import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import Modal from '../../components/Modal'
import { getVaccineTypes, destroyVaccineTypes } from '../../api'
import ModalForm from './ModalForm'

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
  const [totalPage, setTotalPage] = useState(0)
  const [page, setPage] = useState(1)
  const [tableRowsPerPage, setTableRowsPerPage] = useState(20)
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [selected, setSelected] = useState([])

  const callApi = () => {
    getVaccineTypes({
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
    destroyVaccineTypes({
      ids: [...selected],
    }).then((rs) => {
      setSelected([])
      callApi()
    })
  }

  useEffect(() => {
    getVaccineTypes({
      currentPage: page,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }, [openModal])

  const handleChangePage = (event, newPage) => {
    getVaccineTypes({
      currentPage: +newPage + 1,
      perPage: tableRowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const handleChangeRowsPerPage = (event) => {
    getVaccineTypes({
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
          count={totalPage}
          page={page}
          rowsPerPage={tableRowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default VaccineType
