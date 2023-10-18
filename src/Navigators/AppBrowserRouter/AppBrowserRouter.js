import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthSelectors from 'Stores/Auth/Selectors'
import Login from 'pages/LoginPage/loginPage'

function AppBrowserRouter({ isLoggedIn }) {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login"element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: AuthSelectors.isLoggedIn(state),
})

export default connect(mapStateToProps)(AppBrowserRouter)
