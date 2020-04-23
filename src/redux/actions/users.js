export const GET_USERS = 'GET_USERS';

export function getQuestions(questions) {
	return{
        type: GET_USERS,
        questions
    }
}
