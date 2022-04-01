import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper, Grid, TableCell, Typography } from '@mui/material'

import { getHealthDeclaraions, destroyLocations } from '../../api'

import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import TableToolbar from '../../components/TableToolbar'
import ViewModal from './ViewModal'
import NoteBar from './NoteBar'
import PositiveDeclarationModal from './PositiveDeclarationModal'
import NegativeDeclarationModal from './NegativeDeclarationModal'

import {
  getPostitiveDeclarations,
  destroyPostitiveDeclaration,
} from '../../api'

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
    id: 'location',
    label: 'Địa chỉ',
  },
  {
    id: 'created_at',
    label: 'Thời điểm khai báo',
  },
  {
    id: 'status',
    label: 'Ghi chú',
  },
]

const handleRenderTableRow = (row) => {
  return (
    <>
      <TableCell>{row.user.name}</TableCell>
      <TableCell>{row.user.phone}</TableCell>
      <TableCell>{row.location.name}</TableCell>
      <TableCell>{dateFormat(row.created_at, 'hh:mm dd-mm-yyyy')}</TableCell>
      <TableCell>
        {row.severe_symptoms && (
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
        {row.end_date && (
          <Box
            component="div"
            sx={{
              display: 'inline-block',
              bgcolor: 'success.light',
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
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [selected, setSelected] = useState([])

  const [openViewModal, setOpenViewModal] = useState(false)
  const [viewModalData, setViewModalData] = useState({})

  const [openPositiveDeclarationModal, setOpenPositiveDeclarationModal] =
    useState(false)
  const [openNegativeDeclarationModal, setOpenNegativeDeclarationModal] =
    useState(false)

  const callApi = (page, perPage) => {
    getPostitiveDeclarations({
      currentPage: page,
      perPage: perPage,
    }).then((rs) => {
      const { data, currentPage, perPage, count } = rs.data
      setData(data)
      setCount(count)
      setPage(currentPage)
      setRowsPerPage(perPage)
    })
  }

  const handleOpenAddModal = () => {
    setOpenPositiveDeclarationModal(true)
  }

  const handleCloseViewModal = () => setOpenViewModal(false)

  const handleOpenViewModal = (data) => {
    setOpenViewModal(true)
    setViewModalData(data)
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
      const newSelecteds = data.map((n) => n._id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleDeleteTableRows = (selected) => {
    destroyPostitiveDeclaration({
      ids: [...selected],
    }).then(() => {
      setSelected([])
      callApi(page, rowsPerPage)
    })
  }

  return (
    <>
      {openViewModal && (
        <ViewModal data={viewModalData} handleClose={handleCloseViewModal} />
      )}
      {openPositiveDeclarationModal && (
        <PositiveDeclarationModal
          handleClose={() => setOpenPositiveDeclarationModal(false)}
          handleOpenNegativeModal={() => {
            setOpenPositiveDeclarationModal(false)
            setOpenNegativeDeclarationModal(true)
          }}
        />
      )}
      {openNegativeDeclarationModal && (
        <NegativeDeclarationModal
          handleClose={() => setOpenNegativeDeclarationModal(false)}
          handleOpenPositiveModal={() => {
            setOpenNegativeDeclarationModal(false)
            setOpenPositiveDeclarationModal(true)
          }}
        />
      )}
      <TableToolbar
        title="Danh sách các ca nhiễm"
        numSelected={selected.length}
        handleOpenModal={handleOpenAddModal}
        handleDeleteBtn={handleDeleteTableRows}
        selected={selected}
      />
      <NoteBar />
      <Table
        headCells={tableHeadCells}
        bodyCells={data}
        handleRenderRow={handleRenderTableRow}
        handleOpenModal={handleOpenViewModal}
        selected={selected}
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

export default DeclarationHistory
