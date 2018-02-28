import { all } from 'redux-saga/effects';
import { authSagas } from './AuthSagas';

export default function* rootSaga() {
  yield all([
    ...authSagas,
  ]);
}
