import { Box, Avatar, Typography } from '@mui/material'

const Logo = (props) => {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <img
        src="/logo.png"
        style={{
          marginRight: '5%',
          width: '35%',
          objectFit: 'contain',
        }}
      />
      <Typography
        color="text.secondary"
        variant={props.textVariant || 'h6'}
        sx={{ width: '60%', whiteSpace: 'nowrap' }}
      >
        CTU-Covid
      </Typography>
    </Box>
  )
}

export default Logo
