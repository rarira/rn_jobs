import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducers from '../reducers';

export const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(sagaMiddleware, logger)
  )
);

export default store;
