import rootReducer from './redux/reducers/index';
import middleware from './middleware'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
const store = createStore(rootReducer, composeWithDevTools(middleware))

export default store;