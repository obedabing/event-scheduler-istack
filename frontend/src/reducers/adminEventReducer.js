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

  case types.LOGOUT_ADMIN: {
    return initialState
  }
  default:
    return state
  }
}

export default adminEventReducer
