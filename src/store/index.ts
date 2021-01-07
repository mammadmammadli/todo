import { combineReducers } from "redux";
import { TaskReducers } from "./taskReducers";

export const rootReducer = combineReducers({
  tasks: TaskReducers,
});
