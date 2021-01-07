import { combineReducers } from "redux";
import { ListReducer } from "./todoListReducers";

export const rootReducer = combineReducers({
  ListReducer,
});
