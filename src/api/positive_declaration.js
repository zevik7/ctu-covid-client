import axios from 'axios'

export const getPostitiveDeclarations = (params) =>
  axios.get(`/positive_declaration`, {
    params,
  })

// export const updateDeclaration = (params, data) =>
//   axios.put(`/heath_declaration`, data, {
//     params,
//   })

// export const storeDeclaration = (data) => axios.post(`/heath_declaration`, data)

// export const destroyDeclarations = (data) =>
//   axios.delete(`/heath_declaration`, {
//     params: data,
//   })

export const getPDStatByDates = () =>
  axios.get(`/positive_declaration/statByDates`)
