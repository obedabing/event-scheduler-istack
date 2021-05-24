import {
  axios
} from '../constants'

export function verifyNameAndPassword(data) {
  return axios.post(`/api/auth/login`, data)
}

export function verifyToken(jwt = false) {
  return axios.post('/api/auth/token/verify', { token: jwt })
}
