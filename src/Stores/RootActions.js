import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  resetAllStores: null,
  resetSecureStore: null,
  resetMainStore: null,
})

window.creators = Creators
window.types = Types

export const RootTypes = Types
export default Creators
