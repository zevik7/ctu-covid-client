import { useState, useEffect, useRef } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { storeArticle, updateArticle } from '../../api'
import CKEditor from '../../components/CKEditor'
import { useAuth } from '../../context/Auth'

const AddModal = (props) => {
  const { data, updateRows, handleClose } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlertText, setErrorAlertText] = useState('')
  const [pinned, setPinned] = useState(data.pinned)
  const [title, setTitle] = useState(data.title)
  const [content, setContent] = useState(data.content)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title || !content) {
      setErrorAlertText('Vui lòng không bỏ trống tiêu đề hoặc nội dung')
      return
    }

    const article = {
      title,
      content,
      pinned,
    }

    updateArticle({ _id: data._id }, article)
      .then(() => {
        setSuccessAlert(true)
        updateRows()
      })
      .catch((err) => console.log(err))
  }

  const handleChangeArticle = (data) => {
    setContent(data)
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  return (
    <Modal
      handleClose={handleClose}
      sx={{
        width: {
          lg: '60%',
        },
      }}
    >
      {successAlert && (
        <AlertDialog
          text={'Cập nhật thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      {errorAlertText && (
        <AlertDialog
          text={errorAlertText}
          severity="error"
          handleClose={() => setErrorAlertText(false)}
        />
      )}
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Thông tin hướng dẫn</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Nhập tiêu đề hiển thị"
              name="title"
              autoComplete="title"
              autoFocus
              placeholder="Nhập tiêu đề hướng dẫn..."
              value={title}
              onChange={handleChangeTitle}
            />
          </Grid>
          <Grid item xs={12}>
            <CKEditor data={content} handleChange={handleChangeArticle} />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pinned}
                    onChange={() => setPinned(!pinned)}
                  />
                }
                label="Ghim lên đầu"
                sx={{ mr: 'auto' }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mr: 2,
                }}
              >
                Lưu
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
