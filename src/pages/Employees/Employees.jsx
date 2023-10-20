import React, { useEffect, useState} from 'react'
import { ListOfEmployee } from 'Components'
import { connect } from 'react-redux'
import EmployeeActions from 'Stores/Employee/Actions'
import EmployeeSelectors from 'Stores/Employee/Selectors'
import { Spinner } from 'Components'

const Employees = ({
  isLoading,
  EmployeesList,
  getEmployees,
  updateEmployees,
  isLoggedIn,
}) => {
  useEffect(() => getEmployees(), [])
  const handleDate = (listOfAttendance, id) => {
    console.log(listOfAttendance, id)
    updateEmployees(listOfAttendance, id)
  }
  return (
    <div className="App">
      <div className="container mx-auto">
        <h3 className="text-center text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
          List Of Employees
        </h3>
        <div className="flex items-center mt-24 mb-10">
          <div className="flex-grow text-left px-4 py-2 m-2">
            <h5 className="text-gray-900 font-bold text-xl">
              Employee Listing
            </h5>
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <ListOfEmployee
            employees={EmployeesList}
            handleDateAdd={handleDate}
          />
        )}
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(EmployeeActions.getEmployees()),
    updateEmployees: (listOfAttendance, id) =>
      dispatch(EmployeeActions.updateEmployees(listOfAttendance, id)),
  }
}

const mapStateToProps = (state) => ({
  isLoading: EmployeeSelectors.isLoading(state),
  EmployeesList: EmployeeSelectors.EmployeesList(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Employees)
