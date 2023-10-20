import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import { initApiService } from 'Services/ApiService'

/**
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */

const store = (rootReducer, rootSaga) => {
  const sagaMiddleware = createSagaMiddleware()
  // Mount it on the Store
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

  // Then run the saga
  sagaMiddleware.run(rootSaga)
  const persistor = persistStore(store)
  initApiService(store)

  return { store, persistor }
}

export default store
