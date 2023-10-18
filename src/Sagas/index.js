import { login, getUser, logout } from './AuthSaga'


export default function* root() {
  yield all([takeLatest(AuthTypes.LOGIN, login)])
  yield all([takeLatest(AuthTypes.GET_USER, getUser)])
  yield all([takeLatest(AuthTypes.LOGOUT, logout)])
}
