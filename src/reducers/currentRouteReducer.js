import * as types from '../actions/actionTypes';

/*
 * helper function is used to avoid a mess in reducer:
 * check if there has been already this route in history to avoid duplicate routes
 */
const formatCurrentRoute = (route) => {
  let result;
  if (Object.keys(route).length) {
    if (!route.id) {
      let id = Math.round(+new Date()/1000);
        result = Object.assign({}, route, { id: id });
    } else {
      result = Object.assign({}, route);
    }
  } else {
    result = {};
  }
  return result;
};

const initialState = {};

const currentRouteReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_ROUTE_SUCCESS:
      let route = action.result;
      return formatCurrentRoute(route);
    default:
      return state;
  }
};

export default currentRouteReducer;
