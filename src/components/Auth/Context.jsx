import React from 'react'

const AuthContext = React.createContext(null)

const useAuth = () => {
  return React.useContext(AuthContext)
}

export { AuthContext, useAuth }
