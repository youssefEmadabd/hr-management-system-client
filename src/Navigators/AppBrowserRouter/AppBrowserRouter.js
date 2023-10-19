import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthSelectors from 'Stores/Auth/Selectors'
import Login from 'pages/LoginPage/loginPage'
import Employees from 'pages/Employees/Employees'

function AppBrowserRouter({ isLoggedIn }) {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login"element={<Login/>} />
      <Route path="/employee"element={<Employees/>} />
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: AuthSelectors.isLoggedIn(state),
})

export default connect(mapStateToProps)(AppBrowserRouter)
