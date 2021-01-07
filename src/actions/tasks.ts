import { ITask } from "../models/task";
import { ETaskActions } from "./consts";

export const createTask = (task: ITask) => ({
  type: ETaskActions.CREATE,
  payload: task,
});