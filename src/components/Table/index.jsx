import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Paper from '@mui/material/Paper'
import { Divider } from '@mui/material'

function EnhancedTableHead(props) {
  const {
    headCells,
    onSelectAllClick,
    numSelected,
    rowCount,
    disabledCheckbox,
  } = props

  return (
    <TableHead>
      <TableRow>
        {!disabledCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected !== rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all rows',
              }}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={'left'} padding="normal">
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function EnhancedTable(props) {
  const {
    headCells,
    bodyCells,
    selected,
    disabledCheckbox,
    handleRenderRow,
    handleOpenModal,
    handleSelectClick,
    handleSelectAllClick,
  } = props

  const [dense, setDense] = useState(false)

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (_id) => selected.indexOf(_id) !== -1

  return (
    <>
      <TableContainer
        sx={{
          maxHeight: '55vh',
        }}
      >
        <Table
          sx={[...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          stickyHeader
        >
          <EnhancedTableHead
            headCells={headCells}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={bodyCells.length}
            disabledCheckbox={disabledCheckbox}
          />
          <TableBody>
            {bodyCells.slice().map((row, index) => {
              const isItemSelected = isSelected(row._id)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row._id}
                  selected={isItemSelected}
                  onClick={() => handleOpenModal(row)}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  {!disabledCheckbox && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleSelectClick(event, row._id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                  )}

                  <TableCell
                    id={labelId}
                    scope="row"
                    padding="none"
                    sx={{ display: 'none' }}
                  >
                    {row.id}
                  </TableCell>

                  {handleRenderRow(row)}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Xóa khoảng trống"
        sx={{
          ml: 1,
        }}
      />
    </>
  )
}
