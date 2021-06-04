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
  'advertising_101': {
    name: 'Advertising 101',
    type: 'advertising_101',
    colors: {
      left: '#01AFAE',
      right: '#08C7AC',
      text: 'white',
    }
  },
  'advertising_agencies': {
    name: 'Advertising Agencies',
    type: 'advertising_agencies',
    colors: {
      left: '#FE6D5D',
      right: '#FF9565',
      text: 'white',
    }
  },
  'afilliate_marketing': {
    name: 'Afilliate Marketing',
    type: 'afilliate_marketing',
    colors: {
      left: '#1C1656',
      right: '#20167F',
      text: 'white',
    }
  },
  'content_marketing': {
    name: 'Content Marketing',
    type: 'content_marketing',
    colors: {
      left: '#6B2CFF',
      right: '#4929FE',
      text: 'white',
    }
  },
  'coversion_optimization': {
    name: 'Conversion Optimizatoin',
    type: 'coversion_optimization',
    colors: {
      left: '#FEF801',
      right: '#FECE00',
      text: 'black',
    }
  },
  'design_for_growth': {
    name: 'Design for Growth',
    type: 'design_for_growth',
    colors: {
      left: '#CDF87E',
      right: '#9EEB9A',
      text: 'black',
    }
  },
  'ecommerce_d2c': {
    name: 'Ecommerce/D2C',
    type: 'ecommerce_d2c',
    colors: {
      left: '#0B1CF3',
      right: '#0419C7',
      text: 'white',
    }
  },
  'influencer_marketing': {
    name: 'Influencer Marketing',
    type: 'influencer_marketing',
    colors: {
      left: '#8F01FE',
      right: '#E100FE',
      text: 'white',
    }
  },
  'lead_generation': {
    name: 'Lead Generation',
    type: 'lead_generation',
    colors: {
      left: '#01BAFE',
      right: '#0080FE',
      text: 'white',
    }
  },
  'media_buying': {
    name: 'Media Buying',
    type: 'media_buying',
    colors: {
      left: '#5EFAE1',
      right: '#5FE6F8',
      text: 'black',
    }
  },
  'seo_sem': {
    name: 'SEO & SEM',
    type: 'seo_sem',
    colors: {
      left: '#FF9C0D',
      right: '#FFB200',
      text: 'black',
    }
  },
  'future_advertising': {
    name: 'The Future of Advertising',
    type: 'future_advertising',
    colors: {
      left: '#D6172B',
      right: '#E73346',
      text: 'white',
    }
  },
  'stage_break': { name: '--- Stage Break ---', type: 'stage_break' },
}

export const stages = {
  'stage_one': { name: 'Stage One', number: 1 },
  'stage_two': { name: 'Stage Two', number: 2 },
  'stage_three': { name: 'Stage Three', number: 3 },
}

export const days = {
  0: { name: 'Day One', key: 'one' },
  1: { name: 'Day Two', key: 'two' },
  2: { name: 'Day Three', key: 'three' },
}

export const trackIds = Object.keys(tracks)

// REDUCER ACTION
export const LOGOUT_ADMIN = 'LOGOUT_ADMIN'
export const SET_EVENT_SCHEDS = 'SET_EVENT_SCHEDS'
export const SET_EVENTS = 'SET_EVENTS'
export const REMOVE_EVENT = 'REMOVE_EVENT'

export const ADD_EVENT_SCHED = 'ADD_EVENT_SCHED'
export const UPDATE_EVENT_SCHED = 'UPDATE_EVENT_SCHED'
export const REMOVE_EVENT_SCHED = 'REMOVE_EVENT_SCHED'

export const ADD_SCHED_TOPIC = 'ADD_SCHED_TOPIC'
export const UPDATE_SCHED_TOPIC = 'UPDATE_SCHED_TOPIC'
export const REMOVE_SCHED_TOPIC = 'REMOVE_SCHED_TOPIC'

export const SHOW_ERROR = 'SHOW_ERROR'
export const SHOW_SUCCESS = 'SHOW_SUCCESS'
export const CLEAR_ALERTS = 'CLEAR_ALERTS'
export const SET_FIELD_ERRORS = 'SET_FIELD_ERRORS'
export const SET_LOADER = 'SET_LOADER'

export const SET_PUBLIC_EVENTS = 'SET_PUBLIC_EVENTS' 
export const SET_PUBLIC_SCHEDULES = 'SET_PUBLIC_SCHEDULES' 
