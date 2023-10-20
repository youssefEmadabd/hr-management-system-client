import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthSelectors from 'Stores/Auth/Selectors'
import { Login, Employees } from 'pages'

function AppBrowserRouter({ isLoggedIn }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path='/employees' element={isLoggedIn?<Employees/>: <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: AuthSelectors.isLoggedIn(state),
})

export default connect(mapStateToProps)(AppBrowserRouter)
