/* eslint-disable no-undef */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './reducers'

const store = createStore(
  combineReducers(rootReducer),
  applyMiddleware(thunkMiddleware, createLogger()),
)

export default store
