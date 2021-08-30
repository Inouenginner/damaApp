import initialState from '../store/initialState'

export const USER_INIT = "USER_INIT";
export const initUserAction = (user) => {
    return {
        type: "USER_INIT",
        payload: {
            isSignedIn: user.isSignedIn,
            uid: user.uid,
            username: user.username,
            isLoading: user.isLoading,
            role: user.role
        }
    }
};
export const USER_LOG_OUT = "USER_LOG_OUT";
export const logOutUserAction = () => {
    return {
        type: "USER_LOG_OUT",
        payload: initialState.users
    }
};

export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const loginAdminAction = (user) => {
    return {
        type: "ADMIN_LOGIN",
        payload: {
            isSignedIn: user.isSignedIn,
            uid: user.uid,
            username: user.username,
            isLoading: user.isLoading,
            role: user.role
        }
    }
};
export const ADMIN_LOG_OUT = "ADMIN_LOG_OUT";
export const logOutAdminAction = () => {
    return {
        type: "ADMIN_LOG_OUT",
        payload: initialState.users
    }
};