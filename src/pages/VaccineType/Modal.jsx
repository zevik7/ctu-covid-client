import { useState, useEffect } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { updateVaccineType, storeVaccineType } from '../../api'

const MainModal = (props) => {
  const theme = useTheme()

  const { data, handleClose, updateRows } = props

  // edit or add method
  const _id = data._id

  const [successAlert, setSuccessAlert] = useState(false)
  const [errAlertTxt, setErrAlertTxt] = useState('')

  const [form, setForm] = useState({
    name: { value: data.name || '', error: false, errorTxt: '' },
    country: { value: data.country || '', error: false, errorTxt: '' },
    description: data.description,
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    let error = false
    let errorTxt = ''

    if (!value) {
      error = true
      errorTxt = 'Yêu cầu nhập trường này'
    }

    setForm({ ...form, [name]: { value, error, errorTxt } })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const isErr = Object.keys(form).find(
      (key) => key != 'description' && (!form[key].value || form[key].errorTxt)
    )

    if (isErr) {
      setErrAlertTxt('Vui lòng nhập đầy đủ và hợp lệ thông tin')
      return
    }

    const data = new FormData(event.currentTarget)

    try {
      if (_id) {
        await updateVaccineType({ _id }, data)
      } else {
        await storeVaccineType(data)
      }
      setSuccessAlert(true)
      updateRows()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal handleClose={handleClose}>
      {successAlert && (
        <AlertDialog
          title="Thông báo"
          text={(_id ? 'Cập nhật' : 'Thêm') + ' thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      {errAlertTxt && (
        <AlertDialog
          title="Thông báo"
          text={errAlertTxt}
          severity="error"
          handleClose={() => setErrAlertTxt(false)}
        />
      )}
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {(_id && 'Thông tin vắc-xin') || 'Thêm thông tin vắc-xin'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="name"
              label="Tên loại vắc-xin"
              name="name"
              autoComplete="name"
              autoFocus
              value={form.name.value}
              onChange={(e) => handleInput(e)}
              error={form.name.error}
              helperText={form.name.errorTxt}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="country"
              label="Nước sản xuất"
              name="country"
              autoComplete="country"
              autoFocus
              value={form.country.value}
              onChange={(e) => handleInput(e)}
              error={form.country.error}
              helperText={form.country.errorTxt}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mô tả"
              placeholder="Nhập mô tả..."
              name="description"
              fullWidth
              multiline
              rows={6}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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
                  mr: 1,
                }}
              >
                {_id ? 'Lưu' : 'Thêm'}
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

export default MainModal
