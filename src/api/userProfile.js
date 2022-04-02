import axios from 'axios'

export const storeUserProfile = (data) => axios.post(`/user_profile`, data)
