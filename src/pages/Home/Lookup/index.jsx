import { useState, useEffect } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined'

import Map from '../../../components/Map'
import Modal from '../../../components/Modal'
import AlertDialog from '../../../components/AlertDialog'

import { lookupUser } from '../../../api/lookup'

import HistoryModal from './HistoryModal'
import InjectionModal from './InjectionModal'
import PositiveDeclarationListModal from './PositiveDeclarationListModal'

const LookupModal = (props) => {
  const { handleClose } = props

  const [errTxt, setErrTxt] = useState(false)
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false)

  const [identifyInput, setIdentifyInput] = useState('')
  const [identifyInputErrTxt, setIdentifyInputErrTxt] = useState(false)
  const [user, setUser] = useState()

  const [openHistoryModal, setOpenHistoryModal] = useState(false)
  const [openInjectionModal, setOpenInjectionModal] = useState(false)
  const [
    openPositiveDeclarationListModal,
    setOpenPositiveDeclarationListModal,
  ] = useState(false)

  const handleIdentifyInputChange = (e) => {
    const value = e.target.value
    let errTxt = ''
    if (!value) errTxt = 'Vui lòng nhập trường này'
    setIdentifyInput(value)
    setIdentifyInputErrTxt(errTxt)
    setEnableSubmitBtn(value ? true : false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setUser()

    lookupUser({
      user_identify: identifyInput,
    })
      .then((rs) => {
        setUser(rs.data.data)
      })
      .catch((err) => {
        const errorsData = err?.response?.data

        if (
          errorsData &&
          errorsData.type === 'validation' &&
          errorsData.errors
        ) {
          const { user_identify } = errorsData.errors
          if (user_identify) {
            setIdentifyInputErrTxt(user_identify)
          }
        }
      })
  }

  return (
    <Modal handleClose={handleClose}>
      {errTxt && (
        <AlertDialog text={errTxt} severity handleClose={() => setErrTxt('')} />
      )}
      {openHistoryModal && (
        <HistoryModal
          user={user}
          handleClose={() => setOpenHistoryModal(false)}
        />
      )}
      {openInjectionModal && (
        <InjectionModal
          user={user}
          handleClose={() => setOpenInjectionModal(false)}
        />
      )}
      {openPositiveDeclarationListModal && (
        <PositiveDeclarationListModal
          user={user}
          handleClose={() => setOpenPositiveDeclarationListModal(false)}
        />
      )}

      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Tra cứu thông tin khai báo và tiêm chủng
            </Typography>
          </Grid>
          <Grid item xs={12} container>
            <TextField
              label="Nhấp số điện thoại hoặc email"
              name="identify"
              autoComplete="identify"
              autoFocus
              value={identifyInput}
              onChange={handleIdentifyInputChange}
              error={identifyInputErrTxt && true}
              helperText={identifyInputErrTxt}
              sx={{
                mr: 1,
                flex: 1,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!enableSubmitBtn}
              size="large"
              sx={{
                height: '56px',
              }}
            >
              Tra cứu
            </Button>
          </Grid>
          {user && (
            <>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle1'}
                  fontStyle="italic"
                  component={'div'}
                >
                  Kết quả:
                </Typography>
                <Typography align="center">{user.name}</Typography>
                <Typography variant={'subtitle1'} fontStyle="italic">
                  Xem thông tin về:
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                container
                alignItems={'center'}
                justifyContent="space-evenly"
              >
                <Button
                  sx={{ m: 1 }}
                  variant="outlined"
                  endIcon={<HistoryOutlinedIcon />}
                  onClick={() => setOpenHistoryModal(true)}
                >
                  Khai báo y tế
                </Button>
                <Button
                  sx={{ m: 1 }}
                  variant="outlined"
                  color={'warning'}
                  endIcon={<CoronavirusOutlinedIcon />}
                  onClick={() => setOpenPositiveDeclarationListModal(true)}
                >
                  Khai báo F0
                </Button>
                <Button
                  sx={{ m: 1 }}
                  variant="outlined"
                  color={'success'}
                  endIcon={<VaccinesOutlinedIcon />}
                  onClick={() => setOpenInjectionModal(true)}
                >
                  Tiêm chủng
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Modal>
  )
}

export default LookupModal
