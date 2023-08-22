// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'

// import { Provider } from 'react-redux'


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <App />
//     </Provider>
//   </React.StrictMode>
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './Components/Redux/Store.jsx'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <Colin> */}
          <App />
        {/* </Colin> */}
      </PersistGate>
  </Provider>
)