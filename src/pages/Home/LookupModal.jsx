import { useState, useEffect } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { storeLocation } from '../../api'
import Map from '../../components/Map'
import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'

import { useAuth } from '../../context/Auth/Context'

const LookupModal = (props) => {
  const { handleClose, updateRows } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

  const [identityInput, setIdentityInput] = useState('')
  const [identityInputErr, setIdentityInputErr] = useState(false)

  const handleIdentityInputChange = (e) => {
    const value = e.target.value
    let isErr = false
    if (!value) isErr = true
    setIdentityInputErr(isErr)
    setIdentityInput(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Modal handleClose={handleClose} sx={{ borderRadius: 2 }}>
      {successAlert && (
        <AlertDialog
          text={'Thêm thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}

      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Tra cứu lịch sử khai báo và thông tin tiêm chủng
            </Typography>
          </Grid>
          <Grid item xs={12} container>
            <TextField
              label="Nhấp số điện thoại hoặc email"
              name="identity"
              autoComplete="identity"
              autoFocus
              value={identityInput}
              onChange={handleIdentityInputChange}
              error={identityInputErr && true}
              helperText={identityInputErr && 'Vui lòng nhập trường này'}
              sx={{
                flex: 1,
                mr: 1,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!enableSubmitBtn}
              sx={{
                maxHeight: '50px',
              }}
            >
              Tra cứu
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default LookupModal
