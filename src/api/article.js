import axios from 'axios'

// Public
export const getArticles = (params) =>
  axios.get(`/article`, {
    params,
  })

// Require auth
export const updateArticle = (params, data) =>
  axios.put(`/article`, data, {
    params,
  })

export const storeArticle = (data) => axios.post(`/article`, data)

export const destroyArticles = (data) =>
  axios.delete(`/article`, {
    params: data,
  })
