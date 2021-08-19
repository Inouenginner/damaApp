import {logOutUserAction} from "../users/actions"

//ログイン時
export const signOut = () => {
    return async (dispatch, getState) => {
    dispatch(logOutUserAction());
    }
}