import { combineReducers } from 'redux';
import historyReducer from './historyReducer';
import currentRouteReducer from './currentRouteReducer';
import mapReducer from './mapReducer';

const rootReducer = combineReducers({
  currentRoute: currentRouteReducer,
  savedRoutes: historyReducer,
  clear: mapReducer
});

export default rootReducer;
