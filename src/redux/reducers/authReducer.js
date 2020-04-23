import { SET_AUTH } from '../actions/auth';

export default function auth(state = null, action) {
  if (action.type === SET_AUTH) {
    return action.id;
  }
  return state;
}