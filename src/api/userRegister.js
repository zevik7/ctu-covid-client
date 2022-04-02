import axios from 'axios'

export const storeUserRegister = (data) => axios.post(`/user_register`, data)
