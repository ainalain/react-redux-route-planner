import * as types from './actionTypes';

export const getRouteSuccess = (result) => {
  return { type: types.GET_ROUTE_SUCCESS, result };
};

export function getRoute(params) {
  const google = params.google;
  const directionsService = new google.maps.DirectionsService();
  return (dispatch) => {
    directionsService.route(params.request, (response, status) => {
      if (status == 'OK') {
        console.log('response: ', response);
        dispatch(getRouteSuccess(response));
      }
      //TODO: add error handling
    });
  };
}
