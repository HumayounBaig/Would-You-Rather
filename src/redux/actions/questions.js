import { saveQuestion } from '../../utils/apiHandler'
import { addUserQuestion } from '../actions/users'


export function getQuestions(questions) {
	return{
        type: GET_QUESTIONS,
        questions
    }
}

function appendNewQuestion(question) {
    return {
      type: ADD_QUESTION,
      question
    };
  }

export function addQuestion(question){
    return dispatch => {
        return saveQuestion(question).then(
            response => {
                dispatch(appendNewQuestion(response));
                dispatch(addUserQuestion(response));
            }
        )
    }
     
}

export function addQuestionAnswer(authUser, qid, answer) {
    return {
        type: ADD_QUESTION_ANSWER,
        authUser,
        qid,
        answer
    }
}


export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';


