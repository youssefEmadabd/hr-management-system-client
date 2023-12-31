/**
 * Selectors let us factorize logic that queries the state.
 *
 * Selectors can be used in sagas or components to avoid duplicating that logic.
 *
 * Writing selectors is optional as it is not always necessary, we provide a simple example below.
 */

const isLoading = (state) => {
return state.main.employeeState.Loading

}

const EmployeesList = (state) => {
  return state.main.employeeState.EmployeeList
}

const EmployeeSelectors = {
  isLoading,
  EmployeesList
}

export default EmployeeSelectors
