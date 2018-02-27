import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';

export const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(sagaMiddleware)
  )
);

export default store;
