import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/click/'

// Update clicks, needs user id
const updateClicks = (id) => {
  const req = axios.patch(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

export default {
  updateClicks: updateClicks,
}