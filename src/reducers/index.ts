import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import reducerCurrentChild from './reducerCurrentChild'

const createRootReducer = (history:any) => combineReducers({
    router: connectRouter(history),
    reducerCurrentChild
})

export default createRootReducer