import React from 'react'
import QRCode from 'qrcode.react'
import Home from '../../pages/Home'
import CssBaseline from '@mui/material/CssBaseline'

const HomeLayout = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Home />
    </>
  )
}

export default HomeLayout
