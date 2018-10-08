import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// Redux controlled components
import App from './components/App'
import reducers from './reducers'
import middlewares from './middlewares'
import registerServiceWorker from './registerServiceWorker'

//import 'bootstrap/dist/css/bootstrap.css'

const store = createStore(reducers, middlewares)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
