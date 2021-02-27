import {applyMiddleware, createStore, Store} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from 'modules/saga';
import rootReducer from 'modules/reducer';

export const configureStore = (): Store<any> => {
  // Redux middleware configurations
  const middleware = [];
  // Saga Middleware
  const sagaMiddleware = createSagaMiddleware();

  // logger
  const logger = createLogger();
  middleware.push(logger);

  middleware.push(sagaMiddleware);

  // store setup
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  // Kick off root saga
  sagaMiddleware.run(rootSaga);
  return store;
};
