import * as types from '../constants'
import {
  getCookieJwt
} from '../utils'

import {
  createEvent as createEventData,
  fetchEvents as getEvents,
  createEventSched as createEventSchedData,
  fetchEventScheds as getEventScheds,
} from '../api'

export const createEvent = (data) => async () => {
  try {
    const jwt = getCookieJwt()
    const res = await createEventData(jwt, { event: data })
    return res
  } catch ({ response }) {
    return response
  }
}

export const fetchEvents = () => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await getEvents(jwt)
    const { data } = res.data

    dispatch({
      type: types.SET_EVENTS,
      payload: data,
    })
    return res
  } catch ({ response }) {
    return response
  }
}

export const createEventSched = (data, eventId) => async () => {
  try {
    const jwt = getCookieJwt()
    const res = await createEventSchedData(jwt, { event_schedule: data, event_id: eventId })
    return res
  } catch ({ response }) {
    return response
  }
}

export const fetchEventScheds = () => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await getEventScheds(jwt)
    const { data } = res.data

    dispatch({
      type: types.SET_EVENT_SCHEDS,
      payload: data,
    })
    return res
  } catch ({ response }) {
    return response
  }
}



