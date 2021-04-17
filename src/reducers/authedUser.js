import { SET_AUTHED_USER } from '../actions/authedUser';
import { SET_AUTHED_USER_TO_NULL } from '../actions/authedUser';

export default function authedUser(state=null,action){
    console.log(state)
    switch(action.type){
        case SET_AUTHED_USER:
            return {
                ...state,
                id: action.id
            }
        case SET_AUTHED_USER_TO_NULL:
            console.log(state)
            console.log(action.id)
            return null
        default:
            return state
    }

}