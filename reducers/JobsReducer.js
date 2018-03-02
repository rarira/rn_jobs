import {
  FETCH_JOBS_SUCCESS
} from '../sagas/types';

const INITIAL_STATE = {
  results: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return action.payload
    default:
      return state;
  }
}
