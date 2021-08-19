import {createStore as reduxCreateStore, combineReducers, 
    applyMiddleware} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';

//reducerを増やしたらstoreに書き足す
import {WazasReducer} from '../wazas/reducers'
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
            wazas: WazasReducer,
        }),
        applyMiddleware(
            logger,
            routerMiddleware(history),thunk
            )
    )
}