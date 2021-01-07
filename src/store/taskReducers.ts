import { createRoutine } from "redux-saga-routines";
import { ETaskActions } from "../actions/consts";
import { IAction } from "../models";

export const TaskReducers = (state = { list: [] }, action: IAction<any>) => {
  const createRoutineActions = createRoutine(ETaskActions.CREATE);  

  if (action.type === createRoutineActions.SUCCESS) {
    const newTasksList = [...state.list, action.payload];
    return { list: newTasksList };
  }

  return state;
};
