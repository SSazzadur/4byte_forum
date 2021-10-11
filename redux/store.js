import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const composeEnhancers =
    (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleWare = [thunk];

const makeStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWare)));

export const store = createWrapper(makeStore);
