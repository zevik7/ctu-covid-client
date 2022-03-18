import axios from 'axios'

export const getUsers = (params) =>
  axios.get(`/user`, {
    params,
  })

export const getUser = (_id) => axios.get(`/user/${_id}`)

export const updateUser = (params, data) =>
  axios.put(`/user`, data, {
    params,
  })

export const storeUser = (data) => axios.post(`/user`, data)

export const destroyUsers = (data) =>
  axios.delete(`/user`, {
    params: data,
  })
