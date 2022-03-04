import * as React from 'react'
import TablePagination from '@mui/material/TablePagination'

export default function TablePaginationMain(props) {
  const {
    count,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props

  return (
    <TablePagination
      component="div"
      count={count}
      page={page - 1}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[20, 30, 50]}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}
