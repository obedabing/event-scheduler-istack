import * as types from '../constants'
import {
  getCookieJwt
} from '../utils'

import {
  createEvent as createEventData,
  fetchEvents as getEvents,
  createEventSched as createEventSchedData,
  fetchEventScheds as getEventScheds,
  createSchedTopic as createTopic,
  deleteSchedTopic,
  deleteEventSched,
  deleteEvent,
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

export const createEventSched = (dataParams, eventId) => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await createEventSchedData(jwt, { event_schedule: dataParams, event_id: eventId })
    const { data } = res.data

    dispatch({
      type: types.ADD_EVENT_SCHED,
      payload: data,
    })

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

export const createSchedTopic = (dataParams, eventScheduleData, eventId) => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const tranformedData = {
      ...dataParams,
      track_type: dataParams.trackType,
      author_name: dataParams.authorName,
      author_title: dataParams.authorTitle,
    }

    delete tranformedData.trackType
    delete tranformedData.authorName
    delete tranformedData.authorTitle

    const res = await createTopic(jwt, { schedule_topic: tranformedData, event_sched_id: eventScheduleData.id })
    const { data } = res.data

    dispatch({
      type: types.ADD_SCHED_TOPIC,
      payload: {
        eventId,
        eventScheduleData,
        newTopic: data,
      }
    })

    const newData = {
      ...eventScheduleData,
      scheduleTopics: [
        ...eventScheduleData.scheduleTopics,
        data
      ]
    }

    return {
      ...res,
      newData,
    }
  } catch ({ response }) {
    return response
  }
}

export const removeSchedTopic = (schedTopic, eventScheduleData, eventId) => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await deleteSchedTopic(jwt, schedTopic.id)

    dispatch({
      type: types.REMOVE_SCHED_TOPIC,
      payload: {
        eventId,
        eventScheduleData,
        schedTopic,
      }
    })

    return res
  } catch ({ response }) {
   
    return response
  }
}

export const removeEventSched = (eventScheduleData, eventId) => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await deleteEventSched(jwt, eventScheduleData.id)

    dispatch({
      type: types.REMOVE_EVENT_SCHED,
      payload: {
        eventId,
        eventScheduleData,
      }
    })

    return res
  } catch ({ response }) {
   
    return response
  }
}

export const removeEvent = (eventId) => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await deleteEvent(jwt, eventId)

    dispatch({
      type: types.REMOVE_EVENT,
      payload: eventId
    })

    return res
  } catch ({ response }) {
   
    return response
  }
}




