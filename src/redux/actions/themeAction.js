export const openModal = (mode) => {
  return {
    type: 'OPEN_MODAL',
    payload: mode,
  }
}

export const close = (color) => {
  return {
    type: 'SET_COLOR',
    payload: color,
  }
}

export default { setMode, setColor, getTheme }
