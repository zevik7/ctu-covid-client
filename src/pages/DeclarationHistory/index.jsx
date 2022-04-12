import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Paper, Grid, TableCell, Typography } from '@mui/material'

import { getHealthDeclaraions, destroyLocations } from '../../api'

import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import TableToolbar from '../../components/TableToolbar'
import SearchBar from '../../components/SearchBar'

import ViewModal from './ViewModal'
import HistoryModal from './HistoryModal'
import RelatedUsersModal from './RelatedUsersModal'
import NoteBar from './NoteBar'

const tableHeadCells = [
  {
    id: 'name',
    label: 'Tên',
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
  },
  {
    id: 'location',
    label: 'Địa điểm',
  },
  {
    id: 'created_at',
    label: 'Vào lúc',
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
      <TableCell>{dateFormat(row.created_at, 'HH:MM TT dd-mm-yyyy')}</TableCell>
      <TableCell>
        {row.status.danger_area && (
          <Box
            component="div"
            sx={{
              display: 'inline-block',
              bgcolor: 'warning.light',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              mr: 1,
            }}
          ></Box>
        )}
        {row.status.symptom && (
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
      </TableCell>
    </>
  )
}

const DeclarationHistory = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentpage] = useState(1)
  const [perPage, setPerPage] = useState(20)

  const [openViewModal, setOpenViewModal] = useState(false)
  const [viewModalData, setViewModalData] = useState({})

  const [openHistoryModal, setOpenHistoryModal] = useState(false)
  const [openRelatedUsersModal, setOpenRelatedUsersModal] = useState(false)
  const [searchText, setSearchText] = useState('')

  const callApi = (currentPage, perPage, searchText) => {
    getHealthDeclaraions({
      currentPage,
      perPage,
      searchText,
    }).then((rs) => {
      const { data, currentPage, perPage, count } = rs.data
      setCurrentpage(currentPage) // Order is important
      setPerPage(perPage)
      setCount(count)
      setTableBodyCells(data)
    })
  }

  const handleCloseViewModal = () => setOpenViewModal(false)

  const handleOpenViewModal = (data) => {
    setOpenViewModal(true)
    setViewModalData(data)
  }

  useEffect(() => {
    callApi(currentPage, perPage)
  }, [])

  const handleChangePage = (event, newPage) => {
    callApi(+newPage + 1, perPage)
  }

  const handleChangeRowsPerPage = (event) => {
    callApi(currentPage, +event.target.value)
  }

  const handleOnSearchChange = (newText) => {
    setSearchText(newText)
    callApi(1, perPage, newText)
  }

  return (
    <>
      {openViewModal && (
        <ViewModal
          data={viewModalData}
          handleClose={handleCloseViewModal}
          handleOpenRelatedUsersModal={() => setOpenRelatedUsersModal(true)}
          handleOpenHistoryModal={() => setOpenHistoryModal(true)}
        />
      )}
      {openRelatedUsersModal && (
        <RelatedUsersModal
          data={viewModalData}
          handleClose={() => setOpenRelatedUsersModal(false)}
          handleOpenViewModal={handleOpenViewModal}
        />
      )}
      {openHistoryModal && (
        <HistoryModal
          data={viewModalData}
          handleClose={() => setOpenHistoryModal(false)}
        />
      )}
      <SearchBar
        popoverContent={
          <>
            Tìm kiếm người dùng bằng tên, số điện thoại, email
            <br />
            Tìm kiếm bằng địa điểm, thời gian khai báo
          </>
        }
        handleOnChange={handleOnSearchChange}
        value={searchText}
      />
      <TableToolbar
        title="Lịch sử khai báo y tế"
        numSelected={0}
        selected={[]}
        disabledAddBtn={true}
      />
      <NoteBar />
      <Table
        headCells={tableHeadCells}
        bodyCells={tableBodyCells}
        handleRenderRow={handleRenderTableRow}
        handleOpenModal={handleOpenViewModal}
        disabledCheckbox={true}
        selected={[]}
      />
      <TablePagination
        count={count}
        page={currentPage}
        rowsPerPage={perPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

export default DeclarationHistory
