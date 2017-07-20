import * as types from '../actions/actionTypes';

const initialState = [];

/*
 * you can hold the history array in the Map component state
 * but I decided to pass it to the global app state:
 * it would be nice to save history in localStorage, for example
 */
const historyReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPDATE_HISTORY:
    let route = action.payload;
    if (state.findIndex(savedRoute => savedRoute.id === route.id) < 0) {
      return [...state, route];
    } else {
      return state;
    }
    default:
      return state;
  }
};

export default historyReducer;
