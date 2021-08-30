import initialState from '../store/initialState'
import * as Actions from './actions'


export const UserReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.USER_INIT:
            return{
                ...state,
                ...action.payload
            };
        case Actions.USER_LOG_OUT:
            return{
                ...state,
                ...action.payload
            };
        case Actions.ADMIN_LOGIN:
            return{
                ...state,
                ...action.payload
            };
        case Actions.ADMIN_LOG_OUT:
            return{
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}