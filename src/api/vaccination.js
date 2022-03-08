import axios from 'axios'

export const getVaccinations = (params) =>
  axios.get(`/vaccination`, {
    params,
  })

export const updateVaccination = (params, data) =>
  axios.put(`/vaccination`, data, {
    params,
  })

export const storeVaccination = (data) => axios.post(`/vaccination`, data)

export const destroyVaccinations = (data) =>
  axios.delete(`/vaccination`, {
    params: data,
  })
