import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import { Box, Paper } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'

import TableToolbar from '../../components/TableToolbar'
import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import SearchBar from '../../components/SearchBar'

import { destroyArticles, getArticles } from '../../api'

import EditModal from './EditModal'
import AddModal from './AddModal'

const tableHeadCells = [
  {
    id: 'title',
    label: 'Tiêu đề',
  },
  {
    id: 'created_by',
    label: 'Người tạo',
  },
  {
    id: 'updated_at',
    label: 'Cập nhật lần cuối',
  },
  {
    id: 'pinned',
    label: 'Ghim',
  },
]

const handleRenderTableRow = (row) => (
  <>
    <TableCell
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {row.title}
    </TableCell>
    <TableCell>{row.created_by.name}</TableCell>
    <TableCell>{dateFormat(row.updated_at, 'dd/mm/yyyy')}</TableCell>
    <TableCell>
      {row.pinned && <PushPinOutlinedIcon fontSize="small" />}
    </TableCell>
  </>
)

const Injection = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentpage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [selected, setSelected] = useState([])
  const [searchText, setSearchText] = useState('')

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [editModalData, setEditModalData] = useState({})

  const callApi = (currentPage, perPage, searchText) => {
    getArticles({
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
    destroyArticles({
      ids: [...selected],
    }).then((rs) => {
      setSelected([])
      callApi(currentPage, perPage, searchText)
    })
  }

  useEffect(() => {
    callApi(currentPage, perPage)
  }, [])

  const handleChangePage = (event, newPage) => {
    setSelected([])
    callApi(+newPage + 1, perPage, searchText)
  }

  const handleChangeRowsPerPage = (event) => {
    setSelected([])
    callApi(currentPage, +event.target.value, searchText)
  }

  const handleOnSearchChange = (newText) => {
    setSearchText(newText)
    callApi(1, perPage, newText)
  }

  return (
    <>
      {openEditModal && (
        <EditModal
          data={editModalData}
          handleClose={handleCloseEditModal}
          updateRows={() => callApi(currentPage, perPage, searchText)}
        />
      )}
      {openAddModal && (
        <AddModal
          handleClose={handleCloseAddModal}
          updateRows={() => callApi(currentPage, perPage, searchText)}
        />
      )}
      <SearchBar
        popoverContent={
          <>
            Có thể tìm kiếm bằng tên bài viết
            <br />
            Có thể tìm kiếm bằng tên, email của người tạo
          </>
        }
        handleOnChange={handleOnSearchChange}
        value={searchText}
      />
      <TableToolbar
        title="Danh sách bài viết"
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
        page={currentPage}
        rowsPerPage={perPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

export default Injection
