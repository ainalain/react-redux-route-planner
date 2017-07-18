import * as types from '../actions/actionTypes';

const initialState = {};

const currentRouteReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_ROUTE_SUCCESS:
      return Object.assign({}, action.result);
    default:
      return state;
  }
};

export default currentRouteReducer;
