import { put, call } from 'redux-saga/effects'
import { handleError, employeeApiService } from 'Services/ApiService.js'
import EmployeeActions from '../Stores/Employee/Actions'
export function* getEmployees() {
  try {
    const { data } = yield call(employeeApiService.get, '/')
    yield put(EmployeeActions.SetEmployeesSuccess(data))
    console.log('success')
  } catch (e) {
    yield put(EmployeeActions.OnError())
    yield put(EmployeeActions.ResetLoading())
    handleError(e)
  }
}
export function* updateEmployees({ listOfAttendance, id }) {
  try {
    console.log(listOfAttendance, id)
    const { data } = yield call(employeeApiService.patch, `/${id}`, {
      attendance: listOfAttendance,
    })
    yield put(EmployeeActions.SetUpdateEmployeeSuccess(data))
  } catch (e) {
    yield put(EmployeeActions.OnError())
    yield put(EmployeeActions.ResetLoading())
    handleError(e.message)
  }
}
