import { all } from 'redux-saga/effects';
import { authSagas } from './AuthSagas';
import { jobSagas } from './JobSagas';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...jobSagas,
  ]);
}
