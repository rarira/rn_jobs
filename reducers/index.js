import { combineReducers } from 'redux';
import auth from './AuthReducer';
import jobs from './JobsReducer';

export default combineReducers({
  auth,
  jobs,
});
