import React from 'react'
import { Typography } from '@mui/material'

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={[{ p: 1 }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
    >
      {'Copyright © '}
      {process.env.REACT_APP_WEBSITE_NAME}
      {' 2022.'}
    </Typography>
  )
}

export default Copyright
