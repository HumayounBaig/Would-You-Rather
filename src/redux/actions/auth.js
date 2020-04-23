export const SET_AUTH = 'SET_AUTH';

export function authenticateUser(id) {
	return{
        type: SET_AUTH,
        id
    }
}
