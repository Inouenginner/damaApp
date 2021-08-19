export const USER_INIT = "USER_INIT";
export const initUserAction = (user) => {
    return {
        type: "USER_INIT",
        payload: {
            isSignedIn: user.isSignedIn,
            uid: user.uid,
            username: user.username
            isLoading: user.isLoading
        }
    }
};