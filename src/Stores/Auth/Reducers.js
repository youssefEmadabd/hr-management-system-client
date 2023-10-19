import { createReducer } from 'reduxsauce'
import { INITIAL_STATE } from './initialState'
import { AuthTypes } from './Actions'

export const loginLoading = (state) => {
  return {
    ...state,
    loginLoading: true,
  }
}
export const loginResetLoading = (state) => {
  return {
    ...state,
    loginLoading: false,
  }
}

export const loginSuccess = (state, { token, refreshToken, user }) => {
  return {
    ...state,
    refreshToken: refreshToken,
    token: token,
    user: user,
  }
}

export const loginError = (state) => {
  return {
    ...state,
    token: null,
    refreshToken: null,
    user: null,
    loginLoading: false,
  }
}


export const setAuthToken = (state, { token }) => {
  return {
    ...state,
    token: token,
  }
}

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.LOGIN_LOADING]: loginLoading,
  [AuthTypes.LOGIN_RESET_LOADING]: loginResetLoading,
  [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthTypes.LOGIN_ERROR]: loginError,
  [AuthTypes.SET_AUTH_TOKEN]: setAuthToken,
})
