import createSagaMiddleware from 'redux-saga'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools';

const sagaMiddleware = createSagaMiddleware()
export default composeWithDevTools(applyMiddleware(
  sagaMiddleware
))