import {_saveQuestion} from '../utils/api'
import { _saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading} from 'react-redux-loading'
import { addAnswerToUsers, addQuestionToUsers } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SET_UNANSWERED_QUESTIONS = 'SET_UNANSWERED_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER' ;

//action creator for adding a new question event
function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question,
    }
}

function addAnswerToQuestions(questions){
    return {
        type: ADD_ANSWER,
        // users: answer.users,
        questions
    }
}

export function handleAddAnswer(answer,qId){
    // we want to return a function to thunk middleware which is going to be 
    //passed dispatch and getState function. We can invoke getState function
    // to get current state of our store
    return (dispatch, getState) => {
        const { authedUser } = getState();
        // lets show loading bar before we make an asynchronous call
        dispatch(showLoading())
        return _saveQuestionAnswer({
            authedUser: authedUser.id,
            qId,
            answer,
        })
        // once savequestion resolves we need to send/dispatch another action for saving
        // then new quest to our state/store
        .then((res)=> {
            dispatch(addAnswerToQuestions(res.questions))
            dispatch(addAnswerToUsers(res.users))
        })
        // .then((newQuest)=> dispatch(addAnswerToUsers(newQuest)))
        // once new question is added to state then hideloading UI
        .then(()=> dispatch(hideLoading()))
    }
}

// asynchronous action creator for adding a new question event
export function handleAddQuestion(optionOne,optionTwo){
    // we want to return a function to thunk middleware which is going to be 
    //passed dispatch and getState function. We can invoke getState function
    // to get current state of our store
    return (dispatch, getState) => {
        const { authedUser } = getState();
        // lets show loading bar before we make an asynchronous call
        dispatch(showLoading())
        return _saveQuestion({
            optionOne,
            optionTwo,
            author: authedUser.id,
        })
        // once savequestion resolves we need to send/dispatch another action for saving
        // then new quest to our state/store
        .then((newQuest)=> {
            dispatch(addQuestion(newQuest))
            dispatch(addQuestionToUsers(newQuest))
        })
        // once new question is added to state then hideloading UI
        .then(()=> dispatch(hideLoading()))
    }
}

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }

}