import axios from 'axios'
//const baseUrl = '/api/user'
const baseUrl = 'http://localhost:3001/api/user/'

const get = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

const create = () => {
    return axios.post(baseUrl)
}

const resetUser = (id) => {
    const req = axios.patch(`${baseUrl}/reset/${id}`)
    return req.then(res => res.data)
}

export default {
    get: get,
    create: create,
    resetUser: resetUser
}