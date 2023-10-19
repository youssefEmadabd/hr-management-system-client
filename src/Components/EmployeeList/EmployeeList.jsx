import Spinner from '../spinner/spinner'
import React from "react";


const EmployeeList = ({Loading, employees}) => {
  return (
    Loading?<Spinner/>:
    <Fragment>
      {employees.map((employee) => (
        <div className="flex items-center bg-gray-100 mb-10 shadow" key={employee.id}>
          <div className="flex-auto text-left px-4 py-2 m-2">
            <p className="text-gray-900 leading-none">{employee.username}</p>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default EmployeeList