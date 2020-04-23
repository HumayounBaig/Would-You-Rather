import { getUsers } from './users';
import { getQuestions } from './questions';
import { getAllData } from '../utils/apiHandler';

export function handleInitialData() {
  return dispatch => {
    return getAllData()
      .then(({ users, questions }) => {
        dispatch(getQuestions(questions));
        dispatch(getUsers(users));
    });
  };
}
