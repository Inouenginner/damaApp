export const USER_INIT = "USER_INIT";
export const initUserAction = (users) => {
    return {
        type: "USER_INIT",
        payload: {
            isSignedIn: false,
        uid: "",
        username: ""
    }
        }
    }
};