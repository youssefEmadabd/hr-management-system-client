import { createReducer } from 'reduxsauce'
import { INITIAL_STATE } from './initialState'
import { EmployeeTypes } from './Actions'

export const ResetLoading = (state) => {
  return {
    ...state,
    Loading: false,
  }
}

export const Loading = (state) => {
  return {
    ...state,
    Loading: true,
  }
}

export const SetEmployeesSuccess = (state, {data}) => {
  return {
    ...state,
    EmployeeList: data,
    Loading:false,
 
 }
}

export const SetUpdateEmployeeSuccess = (state, {employee}) => {
  console.log(employee)
  let newEmployeeList = state.EmployeeList
  const employeeIndex = newEmployeeList.findIndex(list => list.id === employee.id)
  newEmployeeList[employeeIndex] = employee;
  return{
    ...state,
    EmployeeList:newEmployeeList
  }
}

export const OnError = (state) => {
  return {
    ...state,
    EmployeeList: [],
    Loading: false,
  }
}
/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [EmployeeTypes.LOADING]: Loading,
  [EmployeeTypes.RESET_LOADING]: ResetLoading,
  [EmployeeTypes.SET_EMPLOYEES_SUCCESS]: SetEmployeesSuccess,
  [EmployeeTypes.ON_ERROR]: OnError,
  [EmployeeTypes.SET_UPDATE_EMPLOYEE_SUCCESS]:SetUpdateEmployeeSuccess,
})
