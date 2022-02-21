export const setMode = (mode) => {
  return {
    type: 'SET_MODE',
    payload: mode,
  }
}

export const setColor = (color) => {
  return {
    type: 'SET_COLOR',
    payload: color,
  }
}

export const getTheme = () => {
  return {
    type: 'GET_THEME',
  }
}

export default { setMode, setColor, getTheme }
