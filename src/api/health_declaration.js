import axios from 'axios'

// Public
export const getHealthDeclaraions = (params) =>
  axios.get(`/heath_declaration`, {
    params,
  })

// Require auth
export const updateDeclaration = (params, data) =>
  axios.put(`/heath_declaration`, data, {
    params,
  })

export const storeDeclaration = (data) => axios.post(`/heath_declaration`, data)

export const destroyDeclarations = (data) =>
  axios.delete(`/heath_declaration`, {
    params: data,
  })
