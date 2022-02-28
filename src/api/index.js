import axios from 'axios'

const apiUrl = process.env.REACT_APP_SERVER_API

const loggin = (data) => axios.post(`${apiUrl}/admin/auth/login`, data)

export default {
  loggin,
}
