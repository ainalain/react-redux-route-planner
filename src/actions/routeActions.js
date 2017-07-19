import * as types from './actionTypes';

export const getRouteSuccess = (result) => {
  return { type: types.GET_ROUTE_SUCCESS, result };
};

/*
 * async action: get route from Google Directions Service
 */
export const getCurrentRoute = (params) => {
  const google = params.google;
  const directionsService = new google.maps.DirectionsService();
  return (dispatch) => {
    directionsService.route(params.request, (response, status) => {
      if (status == 'OK') {
        dispatch(getRouteSuccess(response));
      }
      //TODO: add error handling
    });
  };
};

/*
 * sync action: update app state when route is taken from history
 */
export const updateCurrentRoute = (route) => {
  return getRouteSuccess(route);
};

/*
 * sync action: update history array
 */
export const updateHistory = (route) => {
  return {
    type: types.UPDATE_HISTORY,
    payload: route
  };
};
