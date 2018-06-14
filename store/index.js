import { createStore } from 'redux'
import reducer from '../reducers'
import middleware, { sagaMiddleware } from '../middleware'
import rootSaga from '../sagas'

export default createStore(reducer, middleware)

sagaMiddleware.run(rootSaga)
