import { RECEIVE_USERS, ADD_ANSWER_TO_USERS } from '../actions/users';

export default function users(state={},action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_ANSWER_TO_USERS:
            return {
                ...state,
                ...action.users
            }
        default:
            return state
    }

}