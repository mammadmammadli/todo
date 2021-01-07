import { takeLatest } from "redux-saga/effects";
import { ETaskActions } from "../actions/consts";
import { createTaskWorker } from "./taskSaga";

export default function* rootSaga() {
  yield takeLatest(ETaskActions.CREATE as any, createTaskWorker)
  yield takeLatest(ETaskActions.UPDATE_TASK as any, createTaskWorker)
}