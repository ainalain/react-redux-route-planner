import { combineReducers } from 'redux';
import routeHistoryReducer from './routeHistoryReducer';
import currentRouteReducer from './currentRouteReducer';
import mapReducer from './mapReducer';

const rootReducer = combineReducers({
  currentRoute: currentRouteReducer,
  savedRoutes: routeHistoryReducer,
  clear: mapReducer
});

export default rootReducer;
