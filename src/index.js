import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { AppBrowserRouter } from 'Navigators'
import createStore from 'Stores'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import 'rsuite/dist/rsuite.min.css';
const { store, persistor } = createStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppBrowserRouter />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
