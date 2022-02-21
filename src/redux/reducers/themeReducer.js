const getStorage = () => {
  const themeClass = localStorage.getItem('themeMode')
  const colorClass = localStorage.getItem('colorMode')

  return {
    mode: themeClass,
    color: colorClass,
  }
}

const themeReducer = (state = getStorage(), action) => {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
      }
      break

    case 'SET_COLOR':
      return {
        ...state,
        color: action.payload,
      }
      break

    default:
      return state
  }
}

export default themeReducer
