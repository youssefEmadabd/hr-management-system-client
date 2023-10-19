import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  GetEmployeesSuccess: null,
  ResetLoading: null,
  Loading:null,
  OnError: null,
})

export const EmployeeTypes = Types
export default Creators
