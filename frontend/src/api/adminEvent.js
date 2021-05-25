import {
  axios
} from '../constants'

export function createEvent(jwt, data) {
  return axios.post('/api/events', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}