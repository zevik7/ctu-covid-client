import axios from 'axios'

// Public
export const getPostitiveDeclarations = (params) =>
  axios.get(`/positive_declaration`, {
    params,
  })

export const getPDGeneralStat = () =>
  axios.get(`/positive_declaration/general_stat`)

// Require auth
export const updatePostitiveDeclaration = (data) =>
  axios.put(`/positive_declaration`, data)

export const storePostitiveDeclaration = (data) =>
  axios.post(`/positive_declaration`, data)

export const destroyPostitiveDeclaration = (data) =>
  axios.delete(`/positive_declaration`, {
    params: data,
  })
