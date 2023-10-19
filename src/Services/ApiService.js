import axios from 'axios'
import { Config } from 'Config'
import { Notification } from 'rsuite'
import AuthActions from 'Stores/Auth/Actions'

var base64 = require('base-64')

let store
const DEFAULT_TIMEOUT = 0
const DEFAULT_OPTIONS = {
  timeout: DEFAULT_TIMEOUT,
  headers: { store },
}

/**
 * Creates axios instances with different custom configurations
 */

export const employeeApiService = axios.create({
  ...DEFAULT_OPTIONS,
  baseURL: Config.API_URL + '/',
})

const tokenRefreshService = axios.create({
  ...DEFAULT_OPTIONS,
  baseURL: Config.API_URL + '/reset-token',
})

export function initApiService(_store) {
  store = _store
}

export function handleError(error) {
  console.log(error)
  Notification.error(error.message)
}
/**
 * Sets Authorization header
 */
export const setAuthHeader = (token, refreshToken) => {
  store.dispatch(AuthActions.setAuthToken(token))
  if (refreshToken)
    tokenRefreshService.defaults.headers.common['x-refresh-token'] =
      refreshToken
  _executeOnAllServices((service) => {
    service.defaults.headers.Authorization = `Bearer ${token}`
    if (refreshToken)
      service.defaults.headers.common['x-refresh-token'] = refreshToken
  })
}
;(function () {
  _handleUnauthorizedRequests()
})()

function _handleUnauthorizedRequests() {
  const flattenErrorInfo = ({
    response: {
      status,
      statusText,
      data: { message },
    },
  }) => {
    return {
      status,
      statusText,
      message,
    }
  }

  const globalErrorHandler = (error) => {
    if (error && error.response) {
      return Promise.reject(flattenErrorInfo(error))
    } else {
      return Promise.reject(error)
    }
  }

  _executeOnAllServices((service) => {
    service.interceptors.response.use(
      (response) => response,
      globalErrorHandler,
    )

    service.interceptors.request.use(async (config) => {
      config.headers.Authorization =
        `Bearer ${store.getState().secure.authState.token}`
      config.headers['x-refresh-token'] =
        `${store.getState().secure.authState.refreshToken}`
      if (
        store.getState().secure.authState.token !== null &&
        config.baseURL !== Config.API_URL + '/reset-token'
      ) {
        const [, payload] = config.headers.Authorization.substring(7, config.headers.Authorization.length).split('.')
        const { exp: expires } = JSON.parse(base64.decode(payload))
        const now = Date.now()
        let expiry = expires * 1000
        const diff = (expiry - now) / 60000

        try {
          if (diff < 5) {
            console.log('need to refresh token first')
            const tokenResponse = await tokenRefreshService.post(
              '/',
              {},
              {
                headers: {
                  Authorization: `Bearer ${store.getState().secure.authState.token}`,
                  'x-refresh-token':
                    store.getState().secure.authState.refreshToken,
                },
              },
            )
            config.headers.Authorization =
              tokenResponse.data['token']
            setAuthHeader( tokenResponse.data['token'])
          }
        } catch (error) {
          if (error && error.response) {
            const { status } = error.response
            if (status === 401) {
              console.log('Unauthorized')
              window.location = '/login'
              Notification.error('Please login again')
            }
            return Promise.reject(flattenErrorInfo(error))
          } else {
            return Promise.reject(error)
          }
        }
      }
      return config
    })
  })
}

/**
 * Helper function
 */
function _executeOnAllServices(action) {
  ;[employeeApiService].forEach(action)
}
