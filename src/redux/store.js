import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
