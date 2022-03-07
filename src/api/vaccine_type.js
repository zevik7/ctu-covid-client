import axios from 'axios'

export const getVaccineTypes = (params) =>
  axios.get(`/vaccine_type`, {
    params,
  })

export const updateVaccineType = (params, data) =>
  axios.put(`/vaccine_type`, data, {
    params,
  })

export const storeVaccineType = (data) => axios.post(`/vaccine_type`, data)

export const destroyVaccineTypes = (data) =>
  axios.delete(`/vaccine_type`, {
    params: data,
  })
