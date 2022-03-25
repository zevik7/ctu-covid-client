import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { storeUserProfile } from '../../api'

import dateFormat from 'dateformat'

const PositiveDeclarationModal = (props) => {
  const { handleClose } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [avatarUpload, setAvatarUpload] = useState(null)
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

  const [selected, setSelected] = useState('positive')

  return (
    <Modal handleClose={handleClose}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6">Khai báo thông tin F0</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent={'center'}>
          <ToggleButtonGroup
            value={selected}
            exclusive
            onChange={(e) => setSelected(e.target.value)}
            sx={{
              '.MuiButtonBase-root': {
                pt: 0,
                pb: 0,
              },
            }}
          >
            <ToggleButton value="positive" color="error">
              Đã nhiễm
            </ToggleButton>
            <ToggleButton value="negative" color="success">
              Đã khỏi
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default PositiveDeclarationModal
