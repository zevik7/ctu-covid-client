import { useState, useEffect } from 'react'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'

import Copyright from '../../components/Copyright'
import Logo from '../../components/Logo'
import { useAuth } from '../../components/Auth/Context'
import Api from '../../api'
import { Container } from '@mui/material'

import dateFormat from 'dateformat'

const ModalForm = (props) => {
  const { data } = props

  const _id = data._id

  const [form, setForm] = useState({
    name: data.name,
    birthday: data.birthday,
    gender: data.gender,
    email: data.email,
    phone: data.phone,
    address: data.address,
    avatar: data.avatar,
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
  }

  return (
    <Container>
      <Typography variant="h5" mb={2}>
        Thông tin chi tiết
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Avatar
              sx={{
                width: '100%',
                height: '100%',
              }}
              variant="square"
              src={process.env.REACT_APP_SERVER + data.avatar}
            />
            <Button
              variant="outlined"
              sx={{
                marginTop: 2,
              }}
            >
              Thay đổi
            </Button>
          </Box>
        </Grid>
        <Grid item md={10}>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="name"
              label="Họ tên"
              name="name"
              autoComplete="name"
              autoFocus
              value={form.name}
              onChange={(e) => {}}
              sx={{
                mb: '8px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '16px 0 8px 0',
              }}
            >
              <TextField
                id="date"
                label="Ngày sinh"
                type="date"
                name="date"
                value={dateFormat(form.birthday, 'yyyy-mm-dd')}
                sx={{ mr: 2, width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <RadioGroup row>
                <FormControlLabel
                  value="male"
                  control={<Radio checked={form.gender === 'Nam' && true} />}
                  label="Nam"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio checked={form.gender === 'Nữ' && true} />}
                  label="Nữ"
                />
              </RadioGroup>
            </Box>
            <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              label="Email"
              name="email"
              onChange={(e) => {}}
              value={form.email}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="phone"
              label="Số điện thoại"
              name="phone"
              onChange={(e) => {}}
              value={form.phone}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="address"
              label="Địa chỉ"
              name="address"
              onChange={(e) => {}}
              value={form.address}
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              sx={{
                mr: 2,
              }}
            >
              Lưu
            </Button>
            <Button variant="text">Đóng</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ModalForm
