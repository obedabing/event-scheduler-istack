import {
  axios
} from '../constants'

export function fetchEventDates() {
  return axios.get('api/public/events')
}

export function fetchSchedules(data) {
  return axios.get('api/public/event_schedules', {
    params: data
  })
}

