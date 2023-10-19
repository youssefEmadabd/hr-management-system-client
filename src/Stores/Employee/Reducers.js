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

export const GetEmployeesSuccess = (state, { EmployeeList }) => {
  return {
    ...state,
    EmployeeList: EmployeeList,
  }
}

export const OnError = (state) => {
  return {
    ...state,
    EmployeeList:[],
    Loading:false,
  }
}
/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [EmployeeTypes.LOADING]: Loading,
  [EmployeeTypes.RESET_LOADING]: ResetLoading,
  [EmployeeTypes.GET_EMPLOYEES_SUCCESS]: GetEmployeesSuccess,
  [EmployeeTypes.ON_ERROR]: OnError,
})
