// import Cookies from 'js-cookie'

// const cookieOptions = {
//   domain: 'localhost',
//   path: '/',
//   secure: true,
//   sameSite: 'None',
//   expires: 365,
// }

// import {
//   verifyNameAndPassword,
//   verifyToken as verifyJwt,
// } from '../api'

// const setCookieJwt = (jwt) => {
//   Cookies.set('istack-token', jwt, cookieOptions)
// }

// export const getCookieJwt = () => {
//   return Cookies.get('istack-token')
// }

// export const verifyToken = async () => {
//   try {
//     const jwt = getCookieJwt()
//     const res = await verifyJwt(jwt)
    
//     return res
//   } catch ({ response }) {
//     return response
//   }
// }

// export const login = async (name, password) => {
//   try {
//     const res = await verifyNameAndPassword({
//       name,
//       password
//     })

//     const { jwt } = res.data

//     setCookieJwt(jwt)

//     return res
//   } catch ({ response }) {
//     return response
//   }
// }

// export const logout = () => {
//   Cookies.remove('istack-token', cookieOptions)
// }

