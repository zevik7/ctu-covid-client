import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API

const setTokenApi = (token) =>
  (axios.defaults.headers.common = { Authorization: `Bearer ${token}` })

const loggin = (data) => axios.post(`/admin/auth/login`, data)

const getUsers = () => axios.get(`/user`)

export default {
  setTokenApi,
  loggin,
  getUsers,
}
