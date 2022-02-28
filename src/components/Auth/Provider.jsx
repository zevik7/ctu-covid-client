import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from './Context'

const getStorageToken = () => {
  const tokenString = localStorage.getItem('token')
  return tokenString
}

const setStorageToken = (token) => {
  localStorage.setItem('token', token)
}

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [token, setToken] = React.useState(getStorageToken())

  const handleLogin = async (token) => {
    setToken(token)
    setStorageToken(token)
    navigate('/admin')
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
