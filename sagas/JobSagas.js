import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import qs from 'qs';
import reverseGeocode from '../utils/latLngToZip';

import {
  FETCH_JOBS,
  FETCH_JOBS_SUCCESS,
  SWIPE_RIGHT,
  LIKE_JOB,
  CLEAR_LIKED,
  CLEAR_LIKED_JOBS,
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 25,
  q: 'javascript',
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

function* fetchJobs(action) {
  console.log('fetchJobs() called');

  try {
    let zip = yield reverseGeocode(action.region);
    const url = buildJobsUrl(zip);
    let { data } = yield call(axios.get, url);
    yield put({ type: FETCH_JOBS_SUCCESS, payload: data });
    yield call(action.callback);
  } catch (e) {
    console.error(e);
  }
}

function* likeJob(action) {
  console.log('likeJob() called');
  yield put({ type: LIKE_JOB, payload: action.job });
}

function* clearLikedJobs() {
  console.log('clearLikedJob() called');
  yield put({ type: CLEAR_LIKED_JOBS });
}

export const jobSagas = [
  takeEvery(FETCH_JOBS, fetchJobs),
  takeEvery(SWIPE_RIGHT, likeJob),
  takeEvery(CLEAR_LIKED, clearLikedJobs),
];
