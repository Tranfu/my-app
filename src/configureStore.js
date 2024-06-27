// https://redux.js.org/usage/configuring-your-store
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'
import rootReducer from "./reducers";
import sagas from "./sagas";

export default function configureAppStore(preloadedState) {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(logger).prepend(sagaMiddleware),
    preloadedState,
    // enhancers: [monitorReducersEnhancer]
  });
  // then run the saga
  sagaMiddleware.run(sagas);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}
