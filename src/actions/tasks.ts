import { TStatuses } from "../models";
import { ITask } from "../models/task";
import { ETaskActions } from "./consts";

export const createTask = (task: ITask) => ({
  type: ETaskActions.CREATE,
  payload: task,
});

export const updateTask = (id: number, status: TStatuses) => ({
  type: ETaskActions.UPDATE_TASK,
  payload: { id, status },
});
