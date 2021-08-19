export const USER_INIT = "USER_INIT";
export const initUserAction = (users) => {
    return {
        type: "USER_INIT",
        payload: {
            isSignedIn: user.isSignedIn,
            uid: user.uid,
            username: user.username
        }
    }
};