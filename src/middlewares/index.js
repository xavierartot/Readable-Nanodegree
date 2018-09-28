import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { applyMiddleware } from 'redux'

const logger = createLogger({
  collapsed: false,
  duration: true,
  diff: false,
})
export default applyMiddleware(
  thunk,
  logger,
)
