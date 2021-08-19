import {logOutUserAction} from "../users/actions"

//ログイン時
export const signOut = () => {
    dispatch(logOutUserAction());
}