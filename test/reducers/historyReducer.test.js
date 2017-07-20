import expect from 'expect';
import reducer from '../../src/reducers/historyReducer';
import * as actions from '../../src/actions/routeActions';


describe('History reducer', () => {
  const initialState = [];
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should populate state when receives new routes', () => {
    const route = {
      testField: 'test route string'
    };
    const action = actions.updateHistory(route);
    const newState = reducer(initialState, action);
    expect(newState.length).toEqual(1);
    expect(newState[0].testField).toEqual('test route string');
  });

  it('should not add the route that already exists in the state', () => {
    const oldState = [{ testField: 'some string', id: 1 }];
    const route = {
      testField: 'test route string',
      id: 1
    };
    const action = actions.updateHistory(route);
    const newState = reducer(oldState, action);
    expect(newState.length).toEqual(1);
    expect(newState.length).toEqual(oldState.length);
  });
});
