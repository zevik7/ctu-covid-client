import { useState } from 'react'
import { Container, TextField, Box, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import Popover from '../Pophover'
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined'

const Search = (props) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pt: 1,
        }}
      >
        <Popover
          holder={<HelpCenterOutlinedIcon />}
          content={props.popoverContent}
        />
        <TextField
          id="input-with-sx"
          label="Nhập nội dung tìm kiếm"
          variant="standard"
          sx={{ flex: 1, mr: 1, ml: 1 }}
          value={props.value}
          onChange={props.handleOnChange}
        />
        <Button variant="outlined" endIcon={<SearchIcon />}>
          Tìm
        </Button>
      </Box>
    </Container>
  )
}

export default Search
