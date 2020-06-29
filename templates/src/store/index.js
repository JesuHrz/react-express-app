import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import rootReducer from '../reducers'

const initialState = {}
let composeEnhancers = compose

let middlewares = [
  promiseMiddleware()
]

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  const logger = createLogger({
    collapsed: true,
    diff: true
  })
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  middlewares = [...middlewares, logger]
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
)

export default store
