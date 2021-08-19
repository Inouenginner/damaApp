import initialState from '../store/initialState'
import * as Actions from './actions'


export const WazasReducer = (state = initialState.wazas, action) => {
    switch (action.type) {
        case Actions.FETCH_WAZAS:
            return{
                ...state,
                list: [...action.payload]
            };
        case Actions.UPDATE:
            return{
                ...state,
                list: [...action.payload]
            };
        default:
            return state
    }
}