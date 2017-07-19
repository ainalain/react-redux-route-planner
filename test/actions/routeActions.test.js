import * as actions from '../../src/actions/routeActions';
import * as types from '../../src/actions/actionTypes';
import expect from 'expect';

describe('Route actions', () => {
  const response = {
    routes: [],
    status: 'OK'
  };

  it('should create a GET_ROUTE_SUCCESS action', () => {
    const expectedAction = {
      type: types.GET_ROUTE_SUCCESS,
      result: response
    };
    const action = actions.getRouteSuccess(response);
    expect(action).toEqual(expectedAction);
  });

  it('should create an UPDATE_HISTORY action', () => {
    const expectedAction = {
      type: types.UPDATE_HISTORY,
      payload: {}
    };
    const action = actions.updateHistory({});
    expect(action).toEqual(expectedAction);
  });
});
