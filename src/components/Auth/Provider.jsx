import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from './Context'

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [token, setToken] = React.useState(null)

  const handleLogin = async () => {
    const token = '123'
    setToken(token)
    navigate('/admin')
  }

  const handleLogout = () => {
    setToken(null)
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
