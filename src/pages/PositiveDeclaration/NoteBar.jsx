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
            bgcolor: 'error.light',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            mr: 1,
          }}
        ></Box>
        <Typography variant="subtitle2" component="div">
          Có triệu chứng nặng
        </Typography>
        <Box
          component="div"
          sx={{
            bgcolor: 'success.light',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            mr: 1,
            ml: 2,
          }}
        ></Box>
        <Typography variant="subtitle2" component="div">
          Đã khỏi
        </Typography>
      </Box>
    </>
  )
}

export default NoteBar
