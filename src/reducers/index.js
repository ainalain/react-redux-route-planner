import { combineReducers } from 'redux';
import routeHistoryReducer from './routeHistoryReducer';
import currentRouteReducer from './currentRouteReducer';

const rootReducer = combineReducers({
  currentRoute: currentRouteReducer,
  savedRoutes: routeHistoryReducer
});

export default rootReducer;
