import * as React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

export default function Card(props) {
  return (
    <Box
      sx={[
        {
          bgcolor: 'background.paper',
          boxShadow: 2,
          borderRadius: 2,
          borderLeft: 3,
          borderBottom: 1,
          borderColor: props.type || 'text.primary',
          p: 2,
          textAlign: {
            xs: 'center',
            sm: 'left',
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Typography color={'text.secondary'} variant="h6">
        {props.title}
      </Typography>
      <Typography color={props.type || 'text.primary'} variant="h4">
        {props.text}
      </Typography>
      <Typography
        color="text.secondary"
        fontWeight={'bold'}
        variant="subtitle2"
      >
        {props.subText}
      </Typography>
    </Box>
  )
}
