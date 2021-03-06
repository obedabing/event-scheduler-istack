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

export function updateEvent(jwt, data, id) {
  return axios.patch(`/api/events/${id}`, data, {
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

export function updateEventSched(jwt, data, id) {
  return axios.patch(`/api/event_schedules/${id}`, data, {
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

export function updateSchedTopic(jwt, data, id) {
  return axios.patch(`/api/schedule_topics/${id}`, data, {
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

export function deleteEventSched(jwt, id) {
  return axios.delete(`/api/event_schedules/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export function deleteEvent(jwt, id) {
  return axios.delete(`/api/events/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}