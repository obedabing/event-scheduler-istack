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

export function fetchEventScheds(jwt) {
  return axios.get('api/event_schedules', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export function createSchedTopic(jwt, data) {
  return axios.post('/api/schedule_topics', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export function deleteSchedTopic(jwt, id) {
  return axios.delete(`/api/schedule_topics/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}