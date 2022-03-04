import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import { Box, Button } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import Table from '../../components/Table'
import TablePagination from '../../components/TablePagination'
import Api from '../../api'

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
  {
    id: 'editor',
    numeric: false,
    label: 'Thao tác',
  },
]

const handleRenderTableRow = (row) => (
  <>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.gender}</TableCell>
    <TableCell>{dateFormat(row.birthday, 'dd/mm/yyyy')}</TableCell>
    <TableCell>{row.contact.email}</TableCell>
    <TableCell>{row.contact.phone}</TableCell>
    <TableCell>
      <Button size="small" variant="outlined">
        Sửa
      </Button>
    </TableCell>
  </>
)

const User = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  useEffect(() => {
    Api.getUsers().then((rs) => {
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
    Api.getUsers({
      currentPage: +newPage + 1,
      perPage: rowsPerPage,
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  const handleChangeRowsPerPage = (event) => {
    Api.getUsers({
      currentPage: page,
      perPage: parseInt(event.target.value, 10),
    }).then((rs) => {
      setAllState(rs.data)
    })
  }

  return (
    <Box>
      <Table
        headCells={tableHeadCells}
        bodyCells={tableBodyCells}
        renderRow={handleRenderTableRow}
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

export default User
