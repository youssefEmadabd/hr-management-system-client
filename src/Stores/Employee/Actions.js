import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getEmployees:null,
  updateEmployees: ["listOfAttendance","id"],
  SetUpdateEmployeeSuccess: ["employee"],
  SetEmployeesSuccess: ["data"],
  ResetLoading: null,
  Loading:null,
  OnError: null,
})

export const EmployeeTypes = Types
export default Creators
