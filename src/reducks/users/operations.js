import {logOutUserAction} from "../users/actions"
import { push } from "connected-react-router";

//ログアウト時
export const signOut = () => {
    return async (dispatch, getState) => {
        dispatch(logOutUserAction());
        dispatch(push("/"));
    }
}