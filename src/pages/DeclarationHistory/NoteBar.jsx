import React from 'react'
import { Box, Typography } from '@mui/material'

const NoteBar = () => {
  return (
    <>
      <Box
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            mr: 1,
          }}
        >
          Ghi chú:
        </Typography>
        <Box
          component="div"
          sx={{
            bgcolor: 'warning.light',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            mr: 1,
          }}
        ></Box>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            mr: 1,
          }}
        >
          F1
        </Typography>
        <Box
          component="div"
          sx={{
            bgcolor: 'error.light',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            mr: 1,
          }}
        ></Box>
        <Typography variant="subtitle2" component="div">
          Có triệu chứng
        </Typography>
      </Box>
    </>
  )
}

export default NoteBar
