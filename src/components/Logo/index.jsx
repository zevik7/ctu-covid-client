import { Box, Avatar, Typography } from '@mui/material'

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar alt="App Logo" src="/logo.png" sx={{ marginRight: '5px' }} />
      <Typography color="text.secondary">CTU-Covid</Typography>
    </Box>
  )
}

export default Logo
