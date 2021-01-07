import { createRoutine } from "redux-saga-routines";
import { ETaskActions } from "../actions/consts";
import { mockTasks } from "../mocks";
import { IAction } from "../models";

export const TaskReducers = (
  state = { list: mockTasks },
  action: IAction<any>
) => {
  const createRoutineActions = createRoutine(ETaskActions.CREATE);
  const updateTaskRoutineActions = createRoutine(ETaskActions.UPDATE_TASK);

  if (action.type === createRoutineActions.SUCCESS) {
    const newTasksList = [...state.list, action.payload];
    return { list: newTasksList };
  } else if (action.type === updateTaskRoutineActions.SUCCESS) {
    const newTasksList = state.list.map((task) => {
      if (task.id === action.payload.id) {
        return { ...task, status: action.payload.status };
      }
      return task;
    });
    return { list: newTasksList };
  }

  return state;
};
