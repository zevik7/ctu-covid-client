import axios from 'axios'

// Public
export const getLocations = (params) =>
  axios.get(`/location`, {
    params,
  })

export const getLocation = (_id) => axios.get(`/location/${_id}`)

// Require auth
export const updateLocation = (params, data) =>
  axios.put(`/location`, data, {
    params,
  })

export const storeLocation = (data) => axios.post(`/location`, data)

export const destroyLocations = (data) =>
  axios.delete(`/location`, {
    params: data,
  })
