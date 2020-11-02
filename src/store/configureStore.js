import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import authentication from "./authentication";
import posts from "./posts";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({ authentication, posts });

const configureStore = (intial) => {
  return createStore(reducer, intial, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
