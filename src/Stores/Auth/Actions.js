import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  login: ['username', 'password'],
  loginSuccess: ['token', 'refreshToken', 'user'],
  loginResetLoading: null,
  loginLoading:null,
  loginError: null,
  setAuthToken: ['token'],
  logout: null,
})

export const AuthTypes = Types
export default Creators
