import axios from 'axios'

export const lookupUser = (params) =>
  axios.get(`/lookup/user`, {
    params,
  })

export const lookupHealthDeclaration = (params) =>
  axios.get(`/lookup/health_declaration`, {
    params,
  })

export const lookupPositiveDeclaration = (params) =>
  axios.get(`/lookup/positive_declaration`, {
    params,
  })

export const lookupInjection = (params) =>
  axios.get(`/lookup/injection`, {
    params,
  })
