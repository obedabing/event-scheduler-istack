import {
  verifyNameAndPassword,
} from '../api'

export const login = async (name, password) =>{
  try {
    const res = await verifyNameAndPassword({
      name,
      password
    })

    return res
  } catch ({ response }) {
    return response
  }
}