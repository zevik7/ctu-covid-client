import axios from 'axios'

// Require auth
export const getOtp = (data) => axios.post(`/otp`, data)
