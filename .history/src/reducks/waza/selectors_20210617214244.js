import {createSelector} from 'reselect';

const productsSelector = (state) => state.waza;

//商品情報の取得(selector以外のところでstateの変更は行えたが、いざそこから取り出すのはこのselectorの役割)
export const getProducts = createSelector(
    [productsSelector], state => state.wazasList
)