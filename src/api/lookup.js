import axios from 'axios'

export const lookupUser = (params) =>
  axios.get(`/lookup/user`, {
    params,
  })
