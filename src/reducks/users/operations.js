import { logOutUserAction } from "../users/actions";
import { loginAdminAction, logOutAdminAction } from "../users/actions";
import { push } from "connected-react-router";
import { db } from "../../firebase/index";
import sha512 from "js-sha512";

//ユーザー系のoperations
//ログアウト時
export const signOut = () => {
  return async (dispatch, getState) => {
    dispatch(logOutUserAction());
    dispatch(push("/"));
  };
};
//管理者ログイン
export const adLogin = (adName, adPass) => {
  return async (dispatch) => {
    let adminUserDate;
    let adminId;
    const hashPass = sha512(adPass);
    await db
      .collection("users")
      .where("name", "==", adName)
      .where("password", "==", hashPass)
      .where("role", "==", "admin")
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          adminUserDate = doc.data();
          adminId = adminUserDate["id"];
        });
      });
    if (adminUserDate == null) {
      alert("その管理者はいません");
      return false;
    } else {
      // 管理者ユーザーのstate更新
      const adminData = {
        uid: adminId,
        username: adName,
        isSignedIn: true,
        isLoading: false,
        role: "admin",
      };
      dispatch(loginAdminAction(adminData));
      dispatch(push("/adminMenu"));
    }
  };
};

//管理者ログアウト
export const adminSignOut = () => {
  return async (dispatch) => {
    dispatch(logOutAdminAction());
    dispatch(push("/admin"));
  };
};
