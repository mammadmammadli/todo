import { ITask } from "./task";

export interface IAction<T> {
  type: string;
  payload: T;
}

export interface IApplicationState {
  tasks: { list: ITask[] }
}