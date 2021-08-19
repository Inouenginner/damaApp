import {logOutUserAction} from "../users/actions"

//ログアウト時
export const signOut = () => {
    return async (dispatch, getState) => {
        dispatch(logOutUserAction());
    }
}