import { put, call } from 'redux-saga/effects'
import {
  handleError,
  employeeApiService
} from 'Services/ApiService.js'
import EmployeeActions from '../Stores/Auth/Actions'
export function* getEmployees() {
  try {
    const { data } = yield call(employeeApiService.get, '/')
    yield put(EmployeeActions.GetEmployeesSuccess(data))
    yield put(EmployeeActions.ResetLoading())
  } catch (e) {
    yield put(EmployeeActions.OnError())
    handleError(e)
  }
}

