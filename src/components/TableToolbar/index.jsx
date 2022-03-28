import { useState } from 'react'
import { alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import AlertTitle from '@mui/material/AlertTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'

import AlertDialog from '../AlertDialog'

const TableToolbar = (props) => {
  const { title, handleOpenModal, handleDeleteBtn, selected, disabledAddBtn } =
    props

  const [openModal, setOpenModal] = useState(false)

  const numSelected = selected.length

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
      styled={{ position: '-webkit-sticky', position: 'sticky', top: 0 }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} đã chọn
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              setOpenModal(!openModal)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      {openModal && (
        <AlertDialog
          title="Cảnh báo"
          text={
            <>
              Xóa những mục đã chọn <br />{' '}
              <strong>Điều này sẽ không thể khôi phục</strong>
            </>
          }
          severity="warning"
          btnColor="warning"
          handleClose={() => setOpenModal(!openModal)}
          handleConfirm={() => {
            handleDeleteBtn(selected)
            setOpenModal(false)
          }}
        />
      )}
      {!disabledAddBtn && (
        <Button variant="contained" onClick={() => handleOpenModal({})}>
          Thêm
        </Button>
      )}
    </Toolbar>
  )
}

export default TableToolbar
