import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API

export const setTokenApi = (token) =>
  (axios.defaults.headers.common = { Authorization: `Bearer ${token}` })

// Auth api
export * from './auth'

export * from './user'

export * from './injection'

export * from './vaccine_type'

export * from './location'

export * from './health_declaration'

// Public api
export * from './positive_declaration'

export * from './userRegister'

export * from './lookup'
