import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import Table from '../../components/Table'
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
    id: 'address',
    numeric: false,
    label: 'Địa chỉ',
  },
]

const handleRenderTableRow = (row) => (
  <>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.gender}</TableCell>
    <TableCell>{row.birthday}</TableCell>
    <TableCell>{row.contact.email}</TableCell>
    <TableCell>{row.contact.phone}</TableCell>
    <TableCell>{row.contact.address}</TableCell>
  </>
)

const User = () => {
  const [tableBodyCells, setTableBodyCells] = useState([])
  const [tableMetaData, setTableMetaData] = useState({})

  useEffect(() => {
    Api.getUsers().then((rs) => {
      const { data, ...metaData } = rs.data
      setTableBodyCells(data)
      setTableMetaData(metaData)
    })
  }, [])

  return (
    <Box>
      <Table
        headCells={tableHeadCells}
        bodyCells={tableBodyCells}
        metaData={tableMetaData}
        renderRow={handleRenderTableRow}
      />
    </Box>
  )
}

export default User
