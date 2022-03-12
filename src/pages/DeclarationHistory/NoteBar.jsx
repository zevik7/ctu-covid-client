import React from 'react'
import { Box, Typography } from '@mui/material'

const NoteBar = () => {
  return (
    <>
      <Box
        variant="subtitle1"
        align="right"
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
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
          variant="subtitle1"
          component="div"
          sx={{
            mr: 1,
          }}
        >
          Có đi tới từ vùng dịch
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
        <Typography variant="subtitle1" component="div">
          Có triệu chứng của bệnh
        </Typography>
      </Box>
    </>
  )
}

export default NoteBar
