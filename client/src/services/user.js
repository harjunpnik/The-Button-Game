import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/user/'

// Get user by id from DB
const get = (id) => {
  return axios.get(`${baseUrl}/${id}`)
}

// Create new user and return userId and points
const create = () => {
  return axios.post(baseUrl)
}

// Reset user points to 20 with id
const resetUser = (id) => {
  const req = axios.patch(`${baseUrl}/reset/${id}`)
  return req.then(res => res.data)
}

export default {
  get: get,
  create: create,
  resetUser: resetUser 
}