import axios from 'axios'

export const loggin = (data) => axios.post(`/auth/login`, data)
