import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = contact => {
  const request = axios.post(url, contact)
  return request.then(response => response.data)
}

const remove = id => {
  return axios.delete(`${url}/${id}`)
}

export default { getAll, create, remove }