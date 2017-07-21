import * as actions from '../../src/actions/routeActions';
import * as types from '../../src/actions/actionTypes';
import mockGoogleAPI from '../helpers/mockGoogleAPI';
import expect from 'expect';

describe('Route actions', () => {
  const response = {
    routes: [],
    status: 'OK'
  };

  it('should create a GET_ROUTE_SUCCESS action', () => {
    const expectedAction = {
      type: types.GET_ROUTE_SUCCESS,
      payload: response
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

  it('should create an GET_ROUTE_SUCCESS action when route is updated', () => {
    const expectedAction = {
      type: types.GET_ROUTE_SUCCESS,
      payload: {}
    };
    const action = actions.updateCurrentRoute({});
    console.log('action: ', action);
    expect(action).toEqual(expectedAction);
  });

  //hard case, cannot normally test async action with google service
  describe('Actions woth Google route service', () => {
    const api = mockGoogleAPI({success: true });
    it('should create GET_ROUTE_SUCCESS action when route request has been succeeded', () => {
      const expectedAction = { type: types.GET_ROUTE_SUCCESS, payload: response };

    const service = api.maps.DirectionsService();
    const action = service.route(true);

    expect(action).toEqual(expectedAction);
    });

    it('should create GET_ROUTE_ERROR action when route request has been failed', () => {
      const googleApi = mockGoogleAPI({success: false });
      const error = {
        status: 'UNKNOWN_ERROR',
        message: ''
      }
    const expectedAction = { type: types.GET_ROUTE_ERROR, payload: error };
    const service = googleApi.maps.DirectionsService();
    const action = service.route(false);

    expect(action).toEqual(expectedAction);
    });
  });
});
