import * as types from '../constants'
import {
  getCookieJwt,
  replaceArrayObjectElement,
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
  updateSchedTopic as updateTopic,
  updateEventSched as updateSched,
  updateEvent as updateEventData,
} from '../api'

const setTimeTo24hours = (date) => {
  const clone = date
  clone.setHours(24,0,0,0)
  return clone
}

export const createEvent = (data) => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await createEventData(
      jwt,
      { event: { date: setTimeTo24hours(data.date) } }
    )
    return res
  } catch ({ response }) {
    if (response.status === 422) {
      const { error } = response.data
      if (error && error === 'events') {
        dispatch({
          type: types.SHOW_ERROR,
          payload: response.data.message,
        })
      }
    }
    return response
  }
}

export const updateEvent = (data) => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await updateEventData(
      jwt,
      { event: { date: setTimeTo24hours(data.date) } },
      data.id,
    )

    return res
  } catch ({ response }) {
    if (response.status === 422) {
      const { error } = response.data
      if (error && error === 'events') {
        dispatch({
          type: types.SHOW_ERROR,
          payload: response.data.message,
        })
      }
    }
    return response
  }
}

export const fetchEvents = () => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await getEvents(jwt)
    const { data } = res.data

    dispatch({
      type: types.SHOW_SUCCESS,
      paylod: 'Successfully added.'
    })
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
      type: types.SHOW_SUCCESS,
      payload: 'Successfully added.'
    })
    dispatch({
      type: types.ADD_EVENT_SCHED,
      payload: data,
    })

    return res
  } catch ({ response }) {
    if (response.status === 422) {
      const { error, errors } = response.data

      if (error && ['eventSched', 'minutesInterval'].includes(error)) {
        dispatch({
          type: types.SHOW_ERROR,
          payload: response.data.message,
        })
      }

      if (errors) {
        dispatch({
          type: types.SET_FIELD_ERRORS,
          payload: errors,
        })
      }
    }
    return response
  }
}

export const updatedEventSched = (dataParams, eventId) => async (dispatch) => {
  try {
    const jwt = getCookieJwt()
    const res = await updateSched(
      jwt,
      { event_schedule: dataParams, event_id: eventId },
      dataParams.id,
    )
    const { data } = res

    dispatch({
      type: types.SHOW_SUCCESS,
      payload: 'Successfully updated.'
    })
    dispatch({
      type: types.UPDATE_EVENT_SCHED,
      payload: {
        ...data,
        eventId: eventId,
      }
    })

    return res
  } catch ({ response }) {
    if (response.status === 422) {
      const { error, errors } = response.data

      if (error && ['eventSched', 'minutesInterval'].includes(error)) {
        dispatch({
          type: types.SHOW_ERROR,
          payload: response.data.message,
        })
      }

      if (errors) {
        dispatch({
          type: types.SET_FIELD_ERRORS,
          payload: errors,
        })
      }
    }
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

const tansformSchedTopicData = (dataParams) => {
  const tranformedData = {
    ...dataParams,
    track_type: dataParams.trackType,
    author_name: dataParams.authorName,
    author_title: dataParams.authorTitle,
  }

  delete tranformedData.trackType
  delete tranformedData.authorName
  delete tranformedData.authorTitle

  return tranformedData
}

export const createSchedTopic = (dataParams, eventScheduleData, eventId) => async (dispatch) => {
  dispatch({
    type: types.SET_LOADER,
    payload: 'creatingTopic',
  })
  try {
    const jwt = getCookieJwt()
    const tranformedData = tansformSchedTopicData(dataParams)

    const res = await createTopic(jwt, { schedule_topic: tranformedData, event_sched_id: eventScheduleData.id })
    const { data } = res.data

    dispatch({
      type: types.SHOW_SUCCESS,
      payload: 'Successfully added.'
    })
    dispatch({
      type: types.ADD_SCHED_TOPIC,
      payload: {
        eventId,
        eventScheduleData,
        newTopic: data,
      }
    })
    dispatch({
      type: types.SET_LOADER,
      payload: null,
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
    if (response.status === 422) {
      const { error, errors } = response.data
      if (error && ['topics', 'stage'].includes(error)) {
        dispatch({
          type: types.SHOW_ERROR,
          payload: response.data.message,
        })
      } 

      if (errors) {
        dispatch({
          type: types.SET_FIELD_ERRORS,
          payload: errors,
        })
      }
    }
    dispatch({
      type: types.SET_LOADER,
      payload: null,
    })
    return response
  }
}

export const updateSchedTopic = (dataParams, eventScheduleData, eventId) => async (dispatch) => {
  dispatch({
    type: types.SET_LOADER,
    payload: 'updatingTopic',
  })
  try {
    const jwt = getCookieJwt()
    const tranformedData = tansformSchedTopicData(dataParams)

    const res = await updateTopic(jwt, { schedule_topic: tranformedData }, dataParams.id)
    const { data } = res.data

    dispatch({
      type: types.SHOW_SUCCESS,
      payload: 'Successfully updated.'
    })
    dispatch({
      type: types.UPDATE_SCHED_TOPIC,
      payload: {
        eventId,
        eventScheduleData,
        updatedSchedTopic: data,
      }
    })
    dispatch({
      type: types.SET_LOADER,
      payload: null,
    })

    const outdatedSchedTopic = eventScheduleData.scheduleTopics.find((res) => {
      if (res.id === data.id) {
        return res
      }
    })

    const newData = {
      ...eventScheduleData,
      scheduleTopics: replaceArrayObjectElement(
        outdatedSchedTopic,
        data,
        eventScheduleData.scheduleTopics,
      ),
    }

    return {
      ...res,
      newData,
    }
  } catch ({ response }) {
    if (response.status === 422) {
      const { error, errors } = response.data
      if (error && ['topics', 'stage'].includes(error)) {
        dispatch({
          type: types.SHOW_ERROR,
          payload: response.data.message,
        })
      }

      if (errors) {
        dispatch({
          type: types.SET_FIELD_ERRORS,
          payload: errors,
        })
      }
    }
    dispatch({
      type: types.SET_LOADER,
      payload: null,
    })
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
      payload: eventId,
    })

    return res
  } catch ({ response }) {
   
    return response
  }
}

export const clearAlerts = () => ({
  type: types.CLEAR_ALERTS,
  payload: null,
})

export const clearFieldErrors = () => ({
  type: types.SET_FIELD_ERRORS,
  payload: null,
})




