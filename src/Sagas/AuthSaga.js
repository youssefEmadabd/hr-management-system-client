import { put, call } from 'redux-saga/effects'
import {
  setAuthHeader,
  handleError,
  employeeApiService
} from 'Services/ApiService.js'
import AuthActions from 'Stores/Auth/Actions'

export function* login({ username, password }) {
  console.log("HERE")
  yield put(AuthActions.loginLoading())
  try {
    const response = yield call(employeeApiService.post, '/login', {
      username: username,
      password: password,
    })
    setAuthHeader(
      response.data.token,
      response.data.refreshToken,
    )
    yield put(
      AuthActions.loginSuccess(
        response.data.token,
      response.data.refreshToken,
        response.data.employee,
      ),
    )
    yield* postLogin()
    yield put(AuthActions.loginResetLoading())
    yield put(AuthActions.loginResetLoading())
  } catch (e) {
    yield put(AuthActions.loginError())
    handleError(e)
  }
}

export function* postLogin() {
  window.location = '/employees'
}



