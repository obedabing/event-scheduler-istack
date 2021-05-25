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

export function fetchEvents(jwt) {
  return axios.get('api/events', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export function createEventSched(jwt, data) {
  return axios.post('/api/event_schedules', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}