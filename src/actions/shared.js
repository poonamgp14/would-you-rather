import { _getQuestions } from '../utils/api';
import { _getUsers } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';

// TODO: SET ACTUAL AUTHED ID
const AUHTED_ID = 'sarahedo'

export function getInitialData(){
    return (dispatch) => {
        return Promise.all(_getUsers, _getQuestions)
        .then(values =>{
            console.log(values);
            dispatch(setAuthedUser(AUHTED_ID))
            dispatch(receiveUsers(values[0]))
            dispatch(receiveQuestions(values[1]))
        })
    }

}

