import {createSelector} from 'reselect';

const userSelector = (state) => state.users;

export const getUserInfo = createSelector(
    [userSelector], state => state
)
export const getUserId = createSelector(
    [userSelector], state => state.uid
)
export const getUserName = createSelector(
    [userSelector], state => state.username
)
export const getLoading = createSelector(
    [userSelector], state => state.isLoading
)