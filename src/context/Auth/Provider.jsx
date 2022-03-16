import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context'
import { setTokenApi } from '../../api'

const getStorageUser = () => {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  return user
}

const setStorageUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getStorageUser() || {})

  setTokenApi(user.token)

  const handleOnSetUser = useCallback((user) => {
    setUser(user)
    setStorageUser(user)
  }, [])

  const value = useMemo(
    () => ({
      user,
      handleOnSetUser,
      onLogin: (user) => {
        handleOnSetUser(user)
        navigate('/admin')
      },
      onLogout: () => {
        setUser({})
        localStorage.removeItem('user')
      },
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
