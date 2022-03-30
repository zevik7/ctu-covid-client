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
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import Modal from '../../components/Modal'
import AlertDialog from '../../components/AlertDialog'
import { storeUserProfile } from '../../api'
import Map from '../../components/Map'

import dateFormat from 'dateformat'

const PositiveDeclarationModal = (props) => {
  const { handleClose } = props

  const [successAlert, setSuccessAlert] = useState(false)
  const [avatarUpload, setAvatarUpload] = useState(null)
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

  const [selected, setSelected] = useState('positive')

  return (
    <Modal handleClose={handleClose}>
      {successAlert && (
        <AlertDialog
          title="Thông báo"
          text={'Khai báo thành thành công'}
          handleClose={() => setSuccessAlert(false)}
        />
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Khai báo thông tin F0</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent={'center'}
          alignItems="center"
        >
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
              Đang nhiễm
            </ToggleButton>
            <ToggleButton value="negative" color="success">
              Đã khỏi
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            fullWidth
            id="identity"
            label="Nhập số điện thoại hoặc email"
            name="identity"
            autoComplete="identity"
            autoFocus
            // value={form.name.value}
            // onChange={(e) => handleInput(e)}
            // error={form.name.error}
            // helperText={form.name.errorTxt}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="birthday"
            label="Ngày dương tính"
            type="date"
            name="birthday"
            InputLabelProps={{
              shrink: true,
            }}

            // value={dateFormat(form.birthday.value, 'yyyy-mm-dd')}
            // onChange={(e) => handleInput(e)}
            // error={form.birthday.error}
            // helperText={form.birthday.errorTxt}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="seriousCase">
              Bạn có xuất hiện các triệu chứng nặng ? (Khó thở, đau ngực, đau
              đầu...)
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="seriousCase"
              name="serious_case_radio"
              defaultValue={false}
              sx={{ justifyContent: 'center' }}
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Không"
              />
              <FormControlLabel value={true} control={<Radio />} label="Có" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>Chọn vị trí cách ly trên bản đồ</Typography>
          <Map
            style={{
              width: '100%',
              minHeight: '300px',
            }}
            // center={[
            //   declaration.location.position.lat,
            //   declaration.location.position.lng,
            // ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="contained" onClick={handleClose}>
              Xác nhận
            </Button>
            <Button variant="text" onClick={handleClose}>
              Đóng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default PositiveDeclarationModal
