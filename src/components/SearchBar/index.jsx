import { useState, useEffect } from 'react'
import {
  Container,
  TextField,
  Box,
  Button,
  Fab,
  CircularProgress,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined'
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined'

import MouseOverPopover from '../MouseOverPopover'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'vi-VI'

// mic.onstart = () => {
//   console.log('Mics on')
// }
// mic.onerror = (event) => {
//   console.log(event.error)
// }
// mic.onend = () => {
//   console.log('Stopped Mic')
// }

const Search = (props) => {
  const { value, handleOnChange, popoverContent } = props

  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
    } else {
      mic.stop()
      return
    }

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('')

      console.log(transcript)
      handleOnChange(transcript)

      // Auto end
      if (event.results[0].isFinal) {
        mic.stop()
        setIsListening(false)
      }
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 1,
        }}
      >
        {/* Voice Search */}
        <Box sx={{ mr: 3, position: 'relative' }}>
          <Fab
            aria-label="save"
            color="primary"
            size="small"
            onClick={() => setIsListening((isListening) => !isListening)}
          >
            <KeyboardVoiceOutlinedIcon />
          </Fab>
          {isListening && (
            <CircularProgress
              size={52}
              sx={{
                color: 'secondary.main',
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
        <TextField
          id="input-with-sx"
          label="Nhập nội dung tìm kiếm"
          variant="standard"
          sx={{ flex: 1, mr: 1 }}
          value={value}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <MouseOverPopover
          holder={<HelpCenterOutlinedIcon />}
          content={popoverContent}
          sx={{
            mr: 1,
          }}
        />
        <Button
          variant="outlined"
          endIcon={<SearchIcon />}
          sx={{
            mr: 1,
          }}
        >
          Tìm
        </Button>
      </Box>
    </Container>
  )
}

export default Search
