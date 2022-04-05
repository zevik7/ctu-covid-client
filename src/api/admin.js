import axios from 'axios'

// Require auth
export const getAdmin = (_id) => axios.get(`/admin/${_id}`)

export const updateAdmin = (params, data) =>
  axios.put(`/admin`, data, {
    params,
  })

export const updatePassword = (params, data) =>
  axios.put(`/admin/update_password`, data, {
    params,
  })
