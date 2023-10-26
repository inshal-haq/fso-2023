import axios from 'axios'
const url = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherApiUrl = 'http://api.weatherapi.com/v1/current.json?'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getAll = () => {
  const request = axios.get(`${url}/all`)
  return request.then(response => response.data)
}

const getByName = name => {
  const request = axios.get(`${url}/name/${name}`)
  return request.then(response => response.data)
}

const getWeather = city => {
  const request = axios.get(`${weatherApiUrl}key=${apiKey}&q=${city}`)
  return request.then(response => response.data)
}

export default { getAll, getByName, getWeather }