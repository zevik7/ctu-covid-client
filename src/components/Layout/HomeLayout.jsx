import React from 'react'
import QRCode from 'qrcode.react'

const HomeLayout = () => {
  return (
    <div
      style={{
        padding: '60px',
      }}
    >
      <QRCode value="DIADIEM1" renderAs="svg" />
    </div>
  )
}

export default HomeLayout
