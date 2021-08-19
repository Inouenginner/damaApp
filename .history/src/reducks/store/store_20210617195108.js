import {createStore as reduxCreateStore, combineReducers, 
    applyMiddleware} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';

//reducerを増やしたらstoreに書き足す
import {ProductsReducer} from '../products/reducers'
import {UsersReducer} from '../users/reducers';
// eslint-disable-next-line
import { createLogger } from 'redux-logger';

export default function createStore(history) {
    const logger = createLogger({
        collapsed: true,
        diff: true
    });

    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            products: ProductsReducer,
            users: UsersReducer
        }),
        applyMiddleware(
            logger,
            routerMiddleware(history),thunk
            )
    )
}