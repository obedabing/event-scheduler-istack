import * as types from '../constants'

import {
  createEvent as createEventData,
} from '../api'

export const createEvent = (data) => async () => {
  try {
    const jwt = types.cookieStorage.get('istack-token')
    const res = await createEventData(jwt, { event: data })
    console.log("===========================")
    console.log(res)
    console.log("===========================")
    return res
  } catch ({ response }) {
    return response
  }
}
