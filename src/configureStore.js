import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";

const configureStore = () => {
  const middlewares = [createSagaMiddleware()];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger);
  }
  return createStore(reducers, applyMiddleware(...middlewares));
};

export default configureStore;
