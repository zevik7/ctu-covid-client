import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  maxHeight: '95vh',
  overflow: 'auto',
  borderRadius: 2,
  p: {
    xs: 2,
    md: 4,
  },
  width: {
    xs: '90%',
    sm: '80%',
    md: '70%',
    lg: '60%',
    xl: '50%',
  },
}

export default function TransitionsModal(props) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      classes={{ focus: 'border-none' }}
      sx={{
        overflow: 'auto',
      }}
    >
      <Fade in={true}>
        <Box sx={[style, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}>
          {props.children}
        </Box>
      </Fade>
    </Modal>
  )
}
