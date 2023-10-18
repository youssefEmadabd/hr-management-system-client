import { put, call } from 'redux-saga/effects'
import {
  setAuthHeader,
  handleError,
} from 'Services/ApiService.js'
import AuthActions from 'Stores/Auth/Actions'
import RootActions from 'Stores/RootActions'

export function* login({ email, password }) {
  yield put(AuthActions.loginLoading())
  try {
    const response = yield call(employeeApiService.post, '/login', {
      email: email,
      password: password,
    })
    setAuthHeader(
      response.headers['x-auth-token'],
      response.headers['x-refresh-token'],
    )
    yield put(
      AuthActions.loginSuccess(
        response.headers['x-auth-token'],
        response.headers['x-refresh-token'],
        response.data,
      ),
    )
    yield* postLogin()
    yield put(AuthActions.loginResetLoading())
  } catch (e) {
    yield put(AuthActions.loginError())
    handleError(e)
  }
}

export function* postLogin() {
  // window.location = '/user'
}

export function* getUser() {
  try {
    const { data } = yield call(employeeApiService.get, '/user')
    yield put(AuthActions.getUserSuccess(data))
  } catch (e) {
    yield put(AuthActions.getUserFail())
    handleError(e)
  }
}

export function* logout() {
  try {
    yield call(employeeApiService.post, '/logout')
    // Navigate to login page
    yield put(RootActions.resetAllStores())
    window.location = '/login'
  } catch (e) {
    handleError(e)
  }
}
