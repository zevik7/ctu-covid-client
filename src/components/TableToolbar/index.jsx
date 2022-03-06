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
import Modal from '../Modal'

const TableToolbar = (props) => {
  const { title, handleOpenModal, handleDeleteBtn, selected } = props

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
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
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
        <Modal open={openModal} handleClose={() => setOpenModal(!openModal)}>
          <Alert severity="warning">
            <AlertTitle>Cảnh báo</AlertTitle>
            Xóa những mục đã chọn <br />{' '}
            <strong>Điều này sẽ không thể khôi phục</strong>
          </Alert>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                handleDeleteBtn(selected)
                setOpenModal(false)
              }}
            >
              Xóa
            </Button>
            <Button variant="text" onClick={() => setOpenModal(false)}>
              Hủy
            </Button>
          </Stack>
        </Modal>
      )}
      <Button variant="contained" onClick={() => handleOpenModal({})}>
        Thêm
      </Button>
    </Toolbar>
  )
}

export default TableToolbar
