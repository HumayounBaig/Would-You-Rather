export const GET_USERS = 'GET_USERS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';

export function getUsers(users) {
	return{
        type: GET_USERS,
        users
    }
}

//Appends Question to user who created it
export function addQuestion({ id, author}) {
	return{
        type: ADD_QUESTION,
        id,
        author
    }
}
