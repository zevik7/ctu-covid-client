import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API

export const setTokenApi = (token) =>
  (axios.defaults.headers.common = { Authorization: `Bearer ${token}` })

export * from './auth'

export * from './user'

export * from './injection'

export * from './vaccine_type'

export * from './location'

export * from './health_declaration'

export * from './positive_declaration'

export * from './lookup'

export * from './admin'

export * from './article'

export * from './otp'
