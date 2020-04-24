import { 
  GET_USERS,
  ADD_QUESTION

} from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users
      };

      case ADD_QUESTION: 
      const { id, author } = action; 
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