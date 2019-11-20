import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import rootSaga from "./sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger);
  }
  const store = createStore(reducers, applyMiddleware(...middlewares));
  sagaMiddleware.run(rootSaga)
  return store;
};

export default configureStore;
