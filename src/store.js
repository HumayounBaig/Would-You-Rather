import rootReducer from './redux/reducers/index';
import middleware from './middleware'
import { createStore } from 'redux';
const store = createStore(rootReducer, middleware)

export default store;