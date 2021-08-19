import {createSelector} from 'reselect';

const userSelector = (state) => state.users;

//商品情報の取得(selector以外のところでstateの変更は行えたが、いざそこから取り出すのはこのselectorの役割)
export const getUserId = createSelector(
    [userSelector], state => state.uid
)