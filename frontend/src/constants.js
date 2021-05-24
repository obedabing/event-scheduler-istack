import Axios from 'axios'
import Cookies from 'js-cookie'

Axios.defaults.baseURL = 'http://localhost:4000'
Axios.defaults.headers.post['Content-Type'] = 'application/json'

export { Axios as axios }

export const cookieOptions = {
  domain: 'localhost',
  path: '/',
  secure: true,
  sameSite: 'None',
  expires: 365,
}

export { Cookies as cookieStorage }
