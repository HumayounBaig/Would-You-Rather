import { 
  GET_USERS,
  ADD_USER_QUESTION

} from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users
      };

      case ADD_USER_QUESTION: 
      const { author, id } = action;  
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      }
    default:
      return state;
  }
}