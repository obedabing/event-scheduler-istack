import * as types from '../constants'

const initialState = {
  events: [],
  schedules: {},
}

const adminEventReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_PUBLIC_EVENTS: {
    return {
      ...state,
      events: action.payload
    }
  }
  case types.SET_PUBLIC_SCHEDULES: {
    const { eventId, schedules } = action.payload 
    const transformedData = schedules.map((res) => {
      const { scheduleTopics } = res
      return {
        ...res,
        scheduleTopics: scheduleTopics.reduce(
          (acc, val) => ({
            ...acc,
            [val.stage]: val,
          }),
          {},
        )
      }
    })
    return {
      ...state,
      schedules: {
        ...state.schedules,
        [eventId]: transformedData,
      },
    }
  }

  default:
    return state
  }
}

export default adminEventReducer
