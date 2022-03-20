import axios from 'axios'

export const getInjections = (params) =>
  axios.get(`/injection`, {
    params,
  })

export const updateInjection = (params, data) =>
  axios.put(`/injection`, data, {
    params,
  })

export const storeInjection = (data) => axios.post(`/injection`, data)

export const destroyInjections = (data) =>
  axios.delete(`/injection`, {
    params: data,
  })
