import { combineReducers } from 'redux';

import auth from './authReducer';
import questions from './questionReducer';
import users from './usersReducer';

export default combineReducers({
  authUser: auth,
  questions,
  users
});