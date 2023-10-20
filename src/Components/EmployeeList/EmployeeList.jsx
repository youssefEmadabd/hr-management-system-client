import React, { Fragment, useState } from 'react'
import { Button, Modal, DatePicker, List } from 'antd'

const EmployeeList = ({ employees = [], handleDateAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentDate, setCurrentDate] = useState('')
  const [currentId, setCurrentId] = useState('')
  const showModal = (index) => {
    setIsModalOpen(true)
    setCurrentId(employees[index].id)
    setCurrentIndex(index)
  }
  const showAttendanceModal = () => {
    setIsAttendanceModalOpen(true)
  }
  const handleAttendanceModalOk = () => {
    setIsAttendanceModalOpen(false)
  }
  const handleAttendanceModalCancel = () => {
    setIsAttendanceModalOpen(false)
  }
  const handleOk = () => {
    setIsModalOpen(false)
    let listOfAttendance = employees[currentIndex].attendance
    if (!listOfAttendance.includes(currentDate))
      listOfAttendance.push(currentDate)
    handleDateAdd(listOfAttendance, currentId)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString)
    setCurrentDate(dateString)
  }
  return (
    <Fragment>
      {employees.map((employee, index) => (
        <div
          className="flex items-center bg-gray-100 mb-10 shadow"
          key={employee.id}
        >
          <div className="flex-auto text-left px-4 py-2 m-2">
            <p className="flex-auto text-gray-900 leading-none">
              {employee.username}
            </p>
          </div>
          <div className="flex-auto text-right px-4 py-2 m-2">
            <Button type="primary" onClick={()=>showAttendanceModal()} ghost>
              {' '}
              Show attendance dates
            </Button>
          </div>
          <div className="flex-auto text-right px-4 py-2 m-2">
            <Button type="primary" onClick={() => showModal(index)} ghost>
              {' '}
              Select Attendance
            </Button>
          </div>
          <div>
          <Modal
            title="Select Attendance"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <DatePicker onChange={onChange} />
          </Modal>
          </div>
          <Modal
            title="Attendance"
            open={isAttendanceModalOpen}
            onOk={handleAttendanceModalOk}
            onCancel={handleAttendanceModalCancel}
          >
            <List
          itemLayout="horizontal"
          dataSource={employee.attendance}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<p color='green'>Attended</p>}
                description={item}
              />
            </List.Item>
            )}
            />
          </Modal>
        </div>
      ))}
    </Fragment>
  )
}

export default EmployeeList
