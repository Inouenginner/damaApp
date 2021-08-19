export const USER_INIT = "USER_INIT";
export const initUserAction = (user) => {
    return {
        type: "USER_INIT",
        payload: {
            isSignedIn: user.isSignedIn,
            uid: user.uid,
            username: user.username,
            isLoading: user.isLoading
        }
    }
};
export const LOG_OUT = "LOG_OUT";
export const logOutUserAction = () => {
    return {
        type: "LOG_OUT",
        payload: {
            isSignedIn: false,
            uid: "",
            username: "",
            isLoading: true
        }
    }
};