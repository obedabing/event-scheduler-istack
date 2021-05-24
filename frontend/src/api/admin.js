import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:4000'
Axios.defaults.headers.post['Content-Type'] = 'application/json'


export function verifyNameAndPassword(data) {
  return Axios.post(`/api/auth/login`, data)
}

export function verifyToken(jwt = false) {
  return Axios.post('/api/auth/token/verify', { token: jwt })
}
