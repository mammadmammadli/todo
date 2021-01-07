import { createRoutine } from "redux-saga-routines";
import { put } from "redux-saga/effects";
import { IAction, TStatuses } from "../models";
import { ITask } from "../models/task";

export function* createTaskWorker(action: IAction<ITask>) {
  const routine = createRoutine(action.type);
  yield put(routine.success(action.payload));
}

export function* updateTaskWorker(action: IAction<{ task: TStatuses, id: number }>) {
  const routine = createRoutine(action.type);
  yield put(routine.success(action.payload));
}