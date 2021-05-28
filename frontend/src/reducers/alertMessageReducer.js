import * as types from '../constants'

const initialState = {
  error: null,
  success: null,
}

const alertMessageReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.CLEAR_ALERTS: {
    return {
      ...state,
      error: null,
      success: null,
    }
  }
  case types.SHOW_ERROR: {
    return {
      ...state,
      error: action.payload,
    }
  }
  case types.SHOW_SUCCESS: {
    return {
      ...state,
      success: action.payload,
    }
  }

  default:
    return state
  }
}

export default alertMessageReducer
