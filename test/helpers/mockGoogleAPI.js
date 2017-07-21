import * as types from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/currentRouteReducer';
import { getRouteSuccess } from '../../src/actions/routeActions';

const mockAddListener = () => { console.log('fake add listener'); };

const mockRoute = (success) => {
  let actionType = success ? types.GET_ROUTE_SUCCESS : types.GET_ROUTE_ERROR;
  let fakeStatus = success ? 'OK' : 'UNKNOWN_ERROR';
  let result = success ? { status: fakeStatus, routes: []} :
    { status: fakeStatus, message : ''};
  return {
    type: actionType,
    payload: result
  };
};

const mockGoogleAPI = (opt_params) => {
  let params = opt_params || {},
  success = params.success;
  return {
    maps: {
      Map: () => ({ addListener: mockAddListener }),
      Marker: () => ({}),
      DirectionsService: () => ({
        route: mockRoute.bind(null, success),
      }),
      DirectionsRenderer: function() {
        return {
          setMap: () => ({}),
          setPanel: () => ({})
        };
      }
    }
  };
};

export default mockGoogleAPI
