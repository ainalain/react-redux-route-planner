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
    expect(newState.testField).toEqual('test route string');
  });

  it('should create a new id for the new route', () => {
    const result = {
      testField: 'test route string'
    };
    const action = actions.getRouteSuccess(result);
    const newState = reducer(initialState, action);
    expect(Object.keys(newState).length).toEqual(2);
    expect(newState).toIncludeKey('id');
    expect(newState.id).toBeA('number');
  });

  it('should not create a new id for the route from history', () => {
    const savedId = 11;
    const result = {
      testField: 'test route string',
      id: savedId
    };
    const action = actions.getRouteSuccess(result);
    const newState = reducer(initialState, action);
    expect(newState.id).toEqual(savedId);
  });
});
