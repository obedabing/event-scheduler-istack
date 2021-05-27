import moment from 'moment'
import * as types from '../constants'
import {
  replaceArrayElement,
  removeArrayElement,
} from '../utils'

const initialState = {
  event: {
    data: {},
    ids: [],
  },
}

const adminEventReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_EVENTS: {
    const { payload } = action
    return {
      ...state,
      event: {
        ...state.event,
        data: payload.reduce(
          (acc, val) => ({
            ...acc,
            [val.id]: val,
          }),
          {}
        ),
        ids: payload.map((res) => res.id),
      },
    }
  }
  case types.ADD_EVENT_SCHED: {
    const { eventId } = action.payload
    const sortedScheds = [
      ...state.event.data[eventId].eventSchedules,
      action.payload,
    ].sort((a,b) => {
      const timeA = moment(a.time, 'HH:mm').format("HH:mm:ss")
      const timeB = moment(b.time, 'HH:mm').format("HH:mm:ss")

      return timeA.localeCompare(timeB)
    })

    return {
      ...state,
      event: {
        ...state.event,
        data: {
          ...state.event.data,
          [eventId]: {
            ...state.event.data[eventId],
            eventSchedules: sortedScheds,
          },
        },
      },
    }
  }
  case types.ADD_SCHED_TOPIC: {
    const {
      eventId,
      eventScheduleData,
      newTopic,
    } = action.payload


    // const sortedTopics = [
    //   ...eventScheduleData.scheduleTopics,
    //   newTopic,
    // ].sort((a, b) => {
    //   const aStage = parseInt(types.stages[a.stage].number)
    //   const bStage = parseInt(types.stages[b.stage].number)

    //   return aStage - bStage
    // })

    const newData = {
      ...eventScheduleData,
      scheduleTopics: [
        ...eventScheduleData.scheduleTopics,
        newTopic,
      ]
    }

    const updatedEventSchedules = replaceArrayElement(
      eventScheduleData,
      newData,
      state.event.data[eventId].eventSchedules,
    )

    return {
      ...state,
      event: {
        ...state.event,
        data: {
          ...state.event.data,
          [eventId]: {
            ...state.event.data[eventId],
            eventSchedules: updatedEventSchedules,
          },
        },
      },
    }
  }
  case types.REMOVE_SCHED_TOPIC: {
    const {
      eventId,
      eventScheduleData,
      schedTopic,
    } = action.payload

    const newData = {
      ...eventScheduleData,
      scheduleTopics: removeArrayElement(schedTopic, eventScheduleData.scheduleTopics),
    }

    const updatedEventSchedules = replaceArrayElement(
      eventScheduleData,
      newData,
      state.event.data[eventId].eventSchedules,
    )

    return {
      ...state,
      event: {
        ...state.event,
        data: {
          ...state.event.data,
          [eventId]: {
            ...state.event.data[eventId],
            eventSchedules: updatedEventSchedules,
          },
        },
      },
    }
  }
  case types.REMOVE_EVENT_SCHED: {
    const {
      eventId,
      eventScheduleData,
    } = action.payload

    const array = state.event.data[eventId].eventSchedules
    const updatedEventSchedules = removeArrayElement(eventScheduleData, array)

    return {
      ...state,
      event: {
        ...state.event,
        data: {
          ...state.event.data,
          [eventId]: {
            ...state.event.data[eventId],
            eventSchedules: updatedEventSchedules,
          },
        },
      },
    }
  }
  case types.REMOVE_EVENT: {
    const eventId = action.payload
    return {
      ...state,
      event: {
        ...state.event,
        ids: removeArrayElement(eventId, state.event.ids)
      },
    }
  }
  

  case types.LOGOUT_ADMIN: {
    return initialState
  }
  default:
    return state
  }
}

export default adminEventReducer
