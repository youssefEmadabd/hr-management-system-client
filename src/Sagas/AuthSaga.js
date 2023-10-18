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
      response.data.token,
      response.data.refreshToken,
    )
    yield put(
      AuthActions.loginSuccess(
        response.data.token,
      response.data.refreshToken,
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

export function* getEmployee() {
  try {
    const { data } = yield call(employeeApiService.get, '/user')
    yield put(AuthActions.getEmployeeSuccess(data))
  } catch (e) {
    yield put(AuthActions.getEmployeeFail())
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
