import axios from 'axios'

export const getPostitiveDeclarations = (params) =>
  axios.get(`/positive_declaration`, {
    params,
  })

export const updatePostitiveDeclaration = (data) =>
  axios.put(`/positive_declaration`, data)

export const storePostitiveDeclaration = (data) =>
  axios.post(`/positive_declaration`, data)

export const destroyPostitiveDeclaration = (data) =>
  axios.delete(`/positive_declaration`, {
    params: data,
  })

export const getPDStatByDates = () =>
  axios.get(`/positive_declaration/statByDates`)
