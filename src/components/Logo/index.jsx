import { Box, Avatar, Typography } from '@mui/material'

const Logo = (props) => {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '50%',
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
        variant={props.textVariant}
        sx={{ width: '60%' }}
      >
        CTU-Covid
      </Typography>
    </Box>
  )
}

export default Logo
