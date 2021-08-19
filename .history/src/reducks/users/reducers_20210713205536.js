import initialState from '../store/initialState'
import * as Actions from './actions'


export const UserReducer = (state = initialState.wazas, action) => {
    switch (action.type) {
        case Actions.USER_INIT:
            return{
                ...state,
                //storeの書き方的にこやり方（一回配列を展開してまた配列に閉じる）にしないと検知されない（更新したことを知らせれる）
                list: ...action.payload
            };
        default:
            return state
    }
}