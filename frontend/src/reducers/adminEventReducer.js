import * as types from '../constants'

const initialState = {
  event: {
    data: {},
    ids: [],
  },
  eventSchedule: {
    data: {},
    ids: [],
  },
  scheduleTopic: {
    data: {},
    ids: [],
  }
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
  case types.SET_EVENT_SCHEDS: {
    const { payload } = action
    return {
      ...state,
      eventSchedule: {
        ...state.eventSchedule,
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
    return {
      ...state,
      event: {
        ...state.event,
        data: {
          ...state.event.data,
          [eventId]: {
            ...state.event.data[eventId],
            eventSchedules: [
              ...state.event.data[eventId].eventSchedules,
              action.payload,
            ]
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

    const replaceElement = (current, newData, arrayData) => {
      const array = arrayData
      const index = array.indexOf(current)
      array[index] = newData
   
      return array
    }

    const newData = {
      ...eventScheduleData,
      scheduleTopics: [
        ...eventScheduleData.scheduleTopics,
        newTopic,
      ]
    }

    console.log("=========RES=============")
    console.log(newData)
    console.log("======================")

    const updatedEventSchedules = replaceElement(
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
  

  case types.LOGOUT_ADMIN: {
    return initialState
  }
  default:
    return state
  }
}

export default adminEventReducer
