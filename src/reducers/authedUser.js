import { SET_AUTHED_USER } from '../actions/authedUser';
import { SET_AUTHED_USER_TO_NULL } from '../actions/authedUser';

export default function authedUser(state=null,action){
    switch(action.type){
        case SET_AUTHED_USER:
            return {
                ...state,
                id: action.id
            }
        case SET_AUTHED_USER_TO_NULL:
            return null
        default:
            return state
    }

}