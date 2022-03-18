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
  p: 4,
  maxHeight: '90vh',
  maxWidth: '100%',
  overflow: 'auto',
}

export default function TransitionsModal(props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open || true}
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
        <Fade in={props.open || true}>
          <Box
            sx={[style, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
          >
            {props.children}
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
