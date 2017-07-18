import * as types from './actionTypes';

export const clearMap = () => {
  console.log('clear map action');
  return { type: types.CLEAR_MAP };
};
