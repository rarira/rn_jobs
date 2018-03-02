import { combineReducers } from 'redux';
import auth from './AuthReducer';
import jobs from './JobsReducer';
import likedJobs from './LikeReducer';

export default combineReducers({
  auth,
  jobs,
  likedJobs,
});
