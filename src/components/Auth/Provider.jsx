import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from './Context'

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

  const [user, setUser] = React.useState(getStorageUser() || {})

  const handleLogin = async (user) => {
    setUser(user)
    setStorageUser(user)
    navigate('/admin')
  }

  const handleLogout = () => {
    setUser({})
    localStorage.removeItem('user')
  }

  const value = {
    token: user.token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
