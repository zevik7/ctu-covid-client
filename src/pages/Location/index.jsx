import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Button } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import Modal from '../../components/Modal'
import Api from '../../api'
import ModalForm from './ModalForm'

const tableHeadCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Tên địa điểm',
  },
  {
    id: 'create_by_name',
    numeric: false,
    label: 'Người tạo',
  },
  {
    id: 'created_at',
    numeric: false,
    label: 'Ngày tạo',
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
    <TableCell>{dateFormat(row.created_at, 'dd/mm/yyyy')}</TableCell>
    <TableCell>{dateFormat(row.updated_at, 'dd/mm/yyyy')}</TableCell>
  </>
)

const Location = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})

  const handleCloseModal = () => setOpenModal(false)

  const handleOpenModal = (data) => {
    setOpenModal(true)
    setModalData(data)
  }

  useEffect(() => {
    Api.getLocations().then((rs) => {
      setAllState(rs.data)
    })
  }, [])

  const setAllState = (apiData) => {
    const { data, currentPage, perPage, totalPage } = apiData
    setTableBodyCells(data)
    setCount(totalPage)
    setPage(currentPage)
    setRowsPerPage(perPage)
  }

  const handleChangePage = (event, newPage) => {
    Api.getLocations({
      currentPage: +newPage + 1,
      perPage: rowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const handleChangeRowsPerPage = (event) => {
    Api.getLocations({
      currentPage: page,
      perPage: parseInt(event.target.value, 10),
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  return (
    <Box>
      <Modal open={openModal} handleClose={handleCloseModal}>
        <ModalForm data={modalData} />
      </Modal>
      <Table
        headCells={tableHeadCells}
        bodyCells={tableBodyCells}
        renderRow={handleRenderTableRow}
        handleOpenModal={handleOpenModal}
      />
      <TablePagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default Location
