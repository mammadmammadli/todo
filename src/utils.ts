import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { TStatuses } from "./models";
import rootSaga from "./saga";
import { rootReducer } from "./store";

export const store = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const composeEnhancers =
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const store = createStore(
    rootReducer,
    undefined,
    composeEnhancers(middlewareEnhancer)
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export const priorities: Array<{
  key: string,
  value: string,
  text: string
}> = [
  { key: "low", value: "LOW", text: "Low" },
  { key: "medium", value: "MEDIUM", text: "Medium" },
  { key: "high", value: "HIGH", text: "High" },
];

export const filterOptions = [
  { key: 'd', text: 'Date', value: 'date' },
  { key: 'p', text: 'Priority', value: 'priority' },
  { key: 's', text: 'Status', value: 'status' },
]

export const mapStatusToText = (status: TStatuses): string => {
  if (status === 'DONE') {
    return 'Done'
  } else if (status === 'IN_PROGRESS') {
    return 'In progress';
  } else if (status === 'TODO') {
    return 'To-do';
  }

  return '';
} 

export const statusWeight = {
  'DONE': 0,
  'IN_PROGRESS': 1,
  'TODO': 2,
};

export const priorityWeight = {
  'LOW': 0,
  'MEDIUM': 1,
  'HIGH': 2,
};
