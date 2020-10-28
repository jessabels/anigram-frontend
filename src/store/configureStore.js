import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import authentication from "./authentication";
import userDetails from "./user";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({ authentication, userDetails });

const configureStore = () => {
  return createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
