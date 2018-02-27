import { AsyncStorage } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';
import { Facebook } from 'expo';

import {
  FACEBOOK_LOGIN,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
} from './types';

function* doFacebookLogin() {
  console.log('doFacebookLogin() called');

  const { type, token } = yield call(Facebook.logInWithReadPermissionsAsync,
    '214718879105945', {
      permissions: ['public_profile']
    }
  );

  if (type === 'cancel') {
    yield put({ type: FACEBOOK_LOGIN_FAIL });
  } else {
    yield call(AsyncStorage.setItem, 'fb_token', token);
    yield put({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  }
}

// Our worker Saga: will perform the async increment task
function* facebookLogin() {
  console.log('facebookLogin() called');
  const token = yield call(AsyncStorage.getItem, 'fb_token');

  if (token) {
    yield put({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    yield call(doFacebookLogin);
  }
}

export const authSagas = [
  takeEvery(FACEBOOK_LOGIN, facebookLogin),
];
