import * as types from '../actions/actionTypes';

const initialState = [];

export default function routeHistoryReducer(state = initialState, action) {
  switch(action.type) {
    case types.GET_ROUTE_SUCCESS:
      return [...state, action.result];
    default:
      return state;
  }
}
