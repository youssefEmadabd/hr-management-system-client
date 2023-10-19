/**
 * Selectors let us factorize logic that queries the state.
 *
 * Selectors can be used in sagas or components to avoid duplicating that logic.
 *
 * Writing selectors is optional as it is not always necessary, we provide a simple example below.
 */
const getToken = (state) => {
  return state.secure.authState.token
}

const isLoginLoading = (state) => {
return state.secure.authState.loginLoading

}

const isLoggedIn = (state) => {
  return state.secure.authState.token && state.secure.authState.user
}

const getRefreshToken = (state) => {
  return state.secure.authState.refreshToken
}

const AuthSelectors = {
  getToken,
  getRefreshToken,
  isLoggedIn,
  isLoginLoading
}

export default AuthSelectors
