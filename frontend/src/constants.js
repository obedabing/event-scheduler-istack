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

export const tracks = {
  'advertising_101': { name: 'Advertising 101', type: 'advertising_101' },
  'advertising_agencies': { name: 'Advertising Agencies', type: 'advertising_agencies' },
  'afilliate_marketing': { name: 'Afilliate Marketing', type: 'afilliate_marketing' },
  'content_marketing': { name: 'Content Marketing', type: 'content_marketing' },
  'coversion_optimization': { name: 'Conversion Optimizatoin', type: 'coversion_optimization' },
  'design_for_growth': { name: 'Design for Growth', type: 'design_for_growth' },
  'ecommerce_d2c': { name: 'Ecommerce/D2C', type: 'ecommerce_d2c' },
  'influencer_marketing': { name: 'Influencer Marketing', type: 'influencer_marketing' },
  'lead_generation': { name: 'Lead Generation', type: 'lead_generation' },
  'media_buying': { name: 'Media Buying', type: 'media_buying' },
  'seo_sem': { name: 'SEO & SEM', type: 'seo_sem' },
  'future_advertising': { name: 'The Future of Advertising', type: 'future_advertising' },
}

export const stages = {
  'stage_one': { name: 'Stage One' },
  'stage_two': { name: 'Stage Two' },
  'stage_three': { name: 'Stage Three' },
}

export const trackIds = Object.keys(tracks)

// REDUCER ACTION
export const LOGOUT_ADMIN = 'LOGOUT_ADMIN'
export const SET_EVENTS = 'SET_EVENTS'
export const SET_EVENT_SCHEDS = 'SET_EVENT_SCHEDS'
export const ADD_EVENT_SCHED = 'ADD_EVENT_SCHED'
export const ADD_SCHED_TOPIC = 'ADD_SCHED_TOPIC'
