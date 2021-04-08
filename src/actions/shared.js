import { _getQuestions } from '../utils/api';
import { _getUsers } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';
// actions creators this package already gave us
import {showLoading, hideLoading } from 'react-redux-loading'

// TODO: SET ACTUAL AUTHED ID
const AUHTED_ID = 'sarahedo'

// action creator
export function getInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([_getQuestions(), _getUsers()])
        .then(values =>{
            console.log(values);
            dispatch(receiveUsers(values[1]))
            dispatch(receiveQuestions(values[0]))
            dispatch(setAuthedUser(AUHTED_ID))
            dispatch(hideLoading())
        })
    }
}

