import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from '../_DATA';

export const getAllData = () => {
    return Promise.all([_getUsers(), _getQuestions()])
        .then(([users, questions]) => ({
            users, questions
        })
    );
}

export const saveQuestion = (question) => {
    return _saveQuestion(question)
}