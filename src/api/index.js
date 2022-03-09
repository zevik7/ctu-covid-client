import axios from 'axios'

// Global config
axios.defaults.baseURL = process.env.REACT_APP_SERVER_API

export const setTokenApi = (token) =>
  (axios.defaults.headers.common = { Authorization: `Bearer ${token}` })

export const loggin = (data) => axios.post(`/admin/auth/login`, data)

export * from './user'

export * from './vaccination'

export * from './vaccine_type'

export * from './location'
