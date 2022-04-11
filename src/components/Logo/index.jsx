import { Box, Avatar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Logo = (props) => {
  const navigate = useNavigate()
  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
      onClick={() => navigate('/')}
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
