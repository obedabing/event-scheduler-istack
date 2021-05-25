import * as types from '../constants'
import {
  getCookieJwt
} from '../utils'

import {
  verifyNameAndPassword,
  verifyToken as verifyJwt,
} from '../api'

const setCookieJwt = (jwt) => {
  types.cookieStorage.set('istack-token', jwt, types.cookieOptions)
}

export const verifyToken = async () => {
  try {
    const jwt = getCookieJwt()
    const res = await verifyJwt(jwt)
    
    return res
  } catch ({ response }) {
    return response
  }
}

export const login = async (name, password) => {
  try {
    const res = await verifyNameAndPassword({
      name,
      password
    })

    const { jwt } = res.data

    setCookieJwt(jwt)

    return res
  } catch ({ response }) {
    return response
  }
}

export const logout = () => {
  types.cookieStorage.remove('istack-token', types.cookieOptions)
}

