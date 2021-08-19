import initialState from '../store/initialState'
import * as Actions from './actions'


export const UserReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.USER_INIT:
            return{
                ...state,
                ...action.payload
            };
        case Actions.LOG_OUT:
            return{
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}