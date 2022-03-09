import axios from 'axios'

export const getLocations = (params) =>
  axios.get(`/location`, {
    params,
  })

export const updateLocation = (params, data) =>
  axios.put(`/location`, data, {
    params,
  })

export const storeLocation = (data) => axios.post(`/location`, data)

export const destroyLocation = (data) =>
  axios.delete(`/location`, {
    params: data,
  })
