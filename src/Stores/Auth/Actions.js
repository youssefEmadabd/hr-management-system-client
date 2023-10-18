import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  login: ['email', 'password'],
  loginLoading: null,
  loginResetLoading: null,
  loginSuccess: ['token', 'refreshToken', 'user'],
  loginError: null,

  getUser: null,
  getUserSuccess: ['user'],
  getUserFail: null,

  setAuthToken: ['token'],
  logout: null,
})

export const AuthTypes = Types
export default Creators
