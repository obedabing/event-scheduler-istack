import eventReducer from './adminEventReducer'
import alertMessageReducer from './alertMessageReducer'
import publicReducer from './publicReducer'

const reducer = {
  eventData: eventReducer,
  alertMessageData: alertMessageReducer,
  publicData: publicReducer,
}

export default reducer
