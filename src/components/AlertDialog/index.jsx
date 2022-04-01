import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Alert from '@mui/material/Alert'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const alertStyle = {
  alignItems: 'center',
  fontSize: 17,
  bgcolor: 'background.paper',
  '.MuiAlert-icon': {
    fontSize: 30,
  },
  textAlign: 'center',
}

export default function AlertDialogSlide(props) {
  const { title, text, severity, btnColor, handleClose, handleConfirm } = props

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent sx={{ pb: 0 }}>
        <Alert severity={severity || 'success'} sx={alertStyle}>
          {text}
        </Alert>
      </DialogContent>
      <DialogActions
        sx={{
          pb: 2,
        }}
      >
        {handleConfirm && (
          <Button variant="contained" color={btnColor} onClick={handleConfirm}>
            Xác nhận
          </Button>
        )}
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  )
}
