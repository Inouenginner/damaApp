import {fetchWazasAction, uploadWazaInfo} from "./actions"
import {logOutUserAction} from "../users/actions"
import {db, FirebaseTimestamp} from '../../firebase/index'
import {push} from "connected-react-router"


//ログイン時
export const signOut = () => {
        let users = {};
        users["uid"] = id;
        users["username"] = name;
        users["isSignedIn"] = true;
        users["isLoading"] = false;
        dispatch(logOutUserAction(users));
}