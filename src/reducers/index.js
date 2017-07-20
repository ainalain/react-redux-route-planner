import { combineReducers } from 'redux';
import historyReducer from './historyReducer';
import currentRouteReducer from './currentRouteReducer';
import mapReducer from './mapReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  currentRoute: currentRouteReducer,
  savedRoutes: historyReducer,
  clear: mapReducer,
  error: errorReducer
});

export default rootReducer;
