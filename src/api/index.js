import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API

const setTokenApi = (token) =>
  (axios.defaults.headers.common = { Authorization: `Bearer ${token}` })

const loggin = (data) => axios.post(`/admin/auth/login`, data)

const getUsers = (params) =>
  axios.get(`/user`, {
    params,
  })

const updateUser = (params, data) =>
  axios.put(`/user`, data, {
    params,
  })

const storeUser = (data) => axios.post(`/user`, data)

const destroyUsers = (data) =>
  axios.delete(`/user`, {
    params: data,
  })

const getLocations = (params) =>
  axios.get(`/location`, {
    params,
  })

export default {
  setTokenApi,
  loggin,
  getUsers,
  updateUser,
  storeUser,
  destroyUsers,
  getLocations,
}
