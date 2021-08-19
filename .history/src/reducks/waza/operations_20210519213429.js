export const goDetail = () => {
    //storeのstateを初期化しておくように
    return async (dispatch) => {
        auth.signOut().then(() => {
            dispatch(signOutAction());
            dispatch(push('/signin'))
        })
    }

}