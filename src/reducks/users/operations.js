import {logOutUserAction} from "../users/actions"
import { push } from "connected-react-router";

//ログアウト時
export const signOut = () => {
    return async (dispatch, getState) => {
        dispatch(logOutUserAction());
        // auth.onAuthStateChanged( (user) => {
        //     auth.signOut().then(()=>{
        //       console.log("ログアウトしました");
        //     })
        //     .catch( (error)=>{
        //       console.log(`ログアウト時にエラーが発生しました (${error})`);
        //     });
        //   });
          dispatch(push("/"));
    }
}