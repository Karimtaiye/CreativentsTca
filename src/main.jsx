
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './Components/Redux/Store.jsx'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
let persistor = persistStore(store)
import ThemeProvider from './Components/Context/Shop.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
  </Provider>
)