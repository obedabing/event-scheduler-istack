import eventReducer from './adminEventReducer'
import alertMessageReducer from './alertMessageReducer'

const reducer = {
  eventData: eventReducer,
  alertMessageData: alertMessageReducer,
}

export default reducer
