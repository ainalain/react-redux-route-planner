import expect from 'expect';
import reducer from '../../src/reducers/currentRouteReducer';
import * as actions from '../../src/actions/routeActions';


describe('Current route reducer', () => {
  const initialState = {};
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return new route object', () => {
    const result = {
      testField: 'test route string'
    };
    const action = actions.getRouteSuccess(result);
    const newState = reducer(initialState, action);
    console.log(newState.testField);
    expect(newState.testField).toEqual('test route string');
  });
});
