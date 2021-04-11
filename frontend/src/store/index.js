import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import freeze from "redux-freeze";
import thunk from "redux-thunk";

import secureStorage from "../services/secureStorage";

import AuthReducer from "./auth/reducer"

const logger = createLogger();
/**
 *  This defines base configuration for setting up redux with react.
 *  All the middlewares are defined here and base store is created for provider.
 */

let middlewares = [];

//for async operations, network calls
middlewares.push(thunk);

//smart console logging of actions
middlewares.push(logger);

// add freeze dev middleware
// this prevents state from being mutated anywhere in the app during dev
if (process.env.NODE_ENV !== "production") {
    middlewares.push(freeze);
}

/**
 * 
 * @param state current state of the application.
 * saves the current state of the application to localstorage for preventing state to be lost.
 */

function saveStateTOLocalStorage(state) {
    const serilizedState = JSON.stringify(state);
    secureStorage.setItem('state', serilizedState);
}

function loadFromLocalStorage() {
    const serilizedState = secureStorage.getItem('state');
    if (serilizedState === null) return undefined;
    return JSON.parse(serilizedState);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

// create store
const store = createStore(
    combineReducers({
        auth: AuthReducer,
    }),
    persistedState,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

store.subscribe(() => {
    saveStateTOLocalStorage(store.getState());
});


// export
export { store };
