import * as types from '../constants'

export const getCookieJwt = () => {
  return types.cookieStorage.get('istack-token')
}

export const replaceArrayElement = (current, newData, arrayData) => {
  const array = arrayData
  const index = array.findIndex((data) => data.id === current.id)
  array[index] = newData

  return array
}

export const removeArrayElement = (data, arrayData) => {
  const array = arrayData
  const index = arrayData.indexOf(data)
  if (index > -1) {
    array.splice(index, 1);
  }

  return array
}