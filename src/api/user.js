import axios from 'axios'

// Public
export const storeUser = (data) => axios.post(`/user`, data)

export const getUsers = (params) =>
  axios.get(`/user`, {
    params,
  })

// Require auth
export const getUser = (_id) => axios.get(`/user/${_id}`)

export const updateUser = (params, data) =>
  axios.put(`/user`, data, {
    params,
  })

export const destroyUsers = (data) =>
  axios.delete(`/user`, {
    params: data,
  })
