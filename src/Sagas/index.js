import { takeLatest, all } from 'redux-saga/effects'
import { AuthTypes } from 'Stores/Auth/Actions'
import { EmployeeTypes } from 'Stores/Employee/Actions'
import { login } from './AuthSaga'
import { getEmployees, updateEmployees} from './EmployeeSaga'


export default function* root() {
  yield all([takeLatest(AuthTypes.LOGIN, login)])
  yield all([takeLatest(EmployeeTypes.GET_EMPLOYEES, getEmployees)])
  yield all([takeLatest(EmployeeTypes.UPDATE_EMPLOYEES, updateEmployees)])
}
