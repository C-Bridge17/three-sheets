import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import drinksReducer from "./drinks";
import sessionReducer from './session';
import homePageReducer from "./splash";
import storeReducer from "./store";
import tagReducer from './tags'

const rootReducer = combineReducers({
  session: sessionReducer,
  feed: homePageReducer,
  drinks: drinksReducer,
  stores: storeReducer,
  tags: tagReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
