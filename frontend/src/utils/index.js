import * as types from '../constants'

export const getCookieJwt = () => {
  return types.cookieStorage.get('istack-token')
}