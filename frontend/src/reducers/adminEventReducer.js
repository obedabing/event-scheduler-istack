import moment from 'moment'
import * as types from '../constants'
import {
  replaceArrayObjectElement,
  removeArrayObjectElement,
} from '../utils'

const initialState = {
  loader: {
    isLoading: null,
  },
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
  case types.UPDATE_EVENT_SCHED: {
    const { eventId } = action.payload
    const schedId = action.payload.id
    const outdatedSched =  state.event.data[eventId].eventSchedules.find((res) => {
      if (res.id === schedId) {
        return res
      }
    })
    const updatedSched = {
      ...outdatedSched,
      ...action.payload,
    }

    const updatedEventSchedules = replaceArrayObjectElement(
      outdatedSched,
      updatedSched,
      state.event.data[eventId].eventSchedules,
    ).sort((a,b) => {
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
            eventSchedules: updatedEventSchedules,
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

    const newData = {
      ...eventScheduleData,
      scheduleTopics: [
        ...eventScheduleData.scheduleTopics,
        newTopic,
      ]
    }

    const updatedEventSchedules = replaceArrayObjectElement(
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
  case types.UPDATE_SCHED_TOPIC: {
    const {
      eventId,
      eventScheduleData,
      updatedSchedTopic,
    } = action.payload

    const outdatedSchedTopic = eventScheduleData.scheduleTopics.find((res) => {
      if (res.id === updatedSchedTopic.id) {
        return res
      }
    })

    const newData = {
      ...eventScheduleData,
      scheduleTopics: replaceArrayObjectElement(
        outdatedSchedTopic,
        updatedSchedTopic,
        eventScheduleData.scheduleTopics,
      ),
    }

    const updatedEventSchedules = replaceArrayObjectElement(
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
      scheduleTopics: removeArrayObjectElement(schedTopic, eventScheduleData.scheduleTopics),
    }

    const updatedEventSchedules = replaceArrayObjectElement(
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
    const updatedEventSchedules = removeArrayObjectElement(eventScheduleData, array)

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
        ids: removeArrayObjectElement(eventId, state.event.ids)
      },
    }
  }
  case types.SET_LOADER: {
    return {
      ...state,
      loader: {
        isLoading: action.payload,
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
