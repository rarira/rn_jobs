import { all } from 'redux-saga/effects';
import { authSagas } from './auth_sagas';

export default function* rootSaga() {
  yield all([
    ...authSagas,
  ]);
}
