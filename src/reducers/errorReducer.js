import * as types from '../actions/actionTypes';
import * as errorTypes from '../errors/errorTypes';

const initialState = '';

const errorReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_ROUTE_ERROR:
      /* eslint-disable no-console */
      console.log('error message: ', action.payload.message);
      /* eslint-disable no-console */
      return errorTypes[action.payload.status];
    default:
      return state;
  }
};

export default errorReducer;
