import React from 'react'
import { Typography, Link } from '@mui/material'

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      {process.env.REACT_APP_WEBSITE_NAME}
      {' 2022.'}
    </Typography>
  )
}

export default Copyright
