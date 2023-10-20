import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas'
import { reducer as AuthReducer } from './Auth/Reducers'
import { reducer as EmployeeReducer } from './Employee/Reducers'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { createMigrate, persistReducer } from 'redux-persist'
// import createSensitiveStorage from 'redux-persist-sensitive-storage'
import { RootTypes } from './RootActions'

import {
  MAIN_STORE_VERSION,
  SECURE_STORE_VERSION,
  mainStoreMigrations,
  secureStoreMigrations,
} from './Migrate'

const mainPersistConfig = {
  key: 'main',
  storage: storage,
  whitelist: ['employeeState'],
  version: MAIN_STORE_VERSION,
  migrate: createMigrate(mainStoreMigrations, { debug: false }),
  timeout: 0,
}

//TODO Investigate a secure store for the web
const securePersistConfig = {
  key: 'secure',
  storage: storage,
  whitelist: ['authState'],
  version: SECURE_STORE_VERSION,
  migrate: createMigrate(secureStoreMigrations, { debug: false }),
  timeout: 0,
}

const reducer = () => {
  const mainReducer = combineReducers({
    employeeState: EmployeeReducer,
  })

  const secureReducer = combineReducers({
    authState: AuthReducer,
  })

  const persistedReducer = combineReducers({
    main: persistReducer(mainPersistConfig, mainReducer),
    secure: persistReducer(securePersistConfig, secureReducer),
  })

  const rootReducer = (state, action) => {
    if (action.type === RootTypes.RESET_ALL_STORES) {
      setTimeout(async () => {
        await storage.removeItem('persist:main')
        await storage.removeItem('persist:secure')
      })

      state = undefined
    }
    if (action.type === RootTypes.RESET_SECURE_STORE) {
      setTimeout(async () => {
        await storage.removeItem('persist:secure')
      })
      state = {
        ...state,
        secure: {
          ...state.secure,
          authState: undefined,
        },
      }
    }
    return persistedReducer(state, action)
  }

  return configureStore(rootReducer, rootSaga)
}

export default reducer
