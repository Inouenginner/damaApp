import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { WazasReducer } from "../wazas/reducers";
import { createLogger } from "redux-logger";
import { UserReducer } from "../users/reducers";

export default function createStore(history) {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  });

  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      wazas: WazasReducer,
      users: UserReducer,
    }),
    applyMiddleware(logger, routerMiddleware(history), thunk)
  );
}
