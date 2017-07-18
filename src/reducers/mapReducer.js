import * as types from '../actions/actionTypes';

export default function routeHistoryReducer(state = false, action) {
  switch(action.type) {
    case types.CLEAR_MAP:
      return true;
    default:
      return state;
  }
}
