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

const AddModal = (props) => {
  const { user } = useAuth()
  const { handleClose, updateRows } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [errAlertTxt, setErrAlertTxt] = useState('')

  const [form, setForm] = useState({
    name: {
      value: '',
      errTxt: '',
    },
    position: null,
  })

  const handleNameChange = (e) => {
    const value = e.target.value
    let errTxt = ''

    if (!value) errTxt = 'Vui lòng nhập trường này'
    setForm({ ...form, name: { value, errTxt } })
  }

  const handleMapClick = (e) => {
    setForm({ ...form, position: e.latlng })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.value) {
      setForm({
        ...form,
        name: { value: '', errTxt: 'Vui lòng nhập trường này' },
      })
      return
    }

    if (!form.position) {
      setErrAlertTxt('Vui lòng chọn vị trí trên bản đồ')
      return
    }

    storeLocation({
      name: form.name.value,
      created_by_id: user._id,
      position: form.position,
    })
      .then(() => {
        setSuccessAlert(true)
        setForm({
          name: {
            value: '',
            errTxt: '',
          },
          position: null,
        })
        updateRows()
      })
      .catch((err) => console.log(err))
  }

  return (
    <Modal handleClose={handleClose}>
      {successAlert && (
        <AlertDialog
          text={'Thêm thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      {errAlertTxt && (
        <AlertDialog
          text={errAlertTxt}
          handleClose={() => setErrAlertTxt(false)}
        />
      )}
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Thêm địa điểm khai báo mới</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              label="Địa chỉ"
              name="name"
              autoComplete="name"
              autoFocus
              margin="normal"
              value={form.name.value}
              onChange={handleNameChange}
              error={form.name.errTxt ? true : false}
              helperText={form.name.errTxt}
            />
            <Typography variant="subtitle1" gutterBottom component="div">
              Chọn vị trí trên bản đồ
            </Typography>
            <Map
              style={{
                minWidth: '300px',
                minHeight: '300px',
              }}
              handleClick={handleMapClick}
              markers={[
                {
                  position: form.position,
                  popup: form.name.value,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mr: 2,
                }}
              >
                Thêm
              </Button>
              <Button variant="text" onClick={handleClose}>
                Đóng
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default AddModal
