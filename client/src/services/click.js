import axios from 'axios'
//const baseUrl = '/api/click'
const baseUrl = 'http://localhost:3001/api/click/'

const updateClicks = (id) => {
    const req = axios.patch(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

export default {
    updateClicks: updateClicks,
}