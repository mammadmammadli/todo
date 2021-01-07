import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
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

export const priorities = [
  { key: "low", value: "low", text: "Low" },
  { key: "medium", value: "medium", text: "Medium" },
  { key: "high", value: "high", text: "High" },
];
