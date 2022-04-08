import axios from 'axios'

export const getCountries = () =>
  axios.get('https://api.covid19api.com/countries')

export const getSummary = () => axios.get('https://api.covid19api.com/summary')

export const getReportByCountry = (country) =>
  axios.get(`https://api.covid19api.com/total/country/${country}`)
