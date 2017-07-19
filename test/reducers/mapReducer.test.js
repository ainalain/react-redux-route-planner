import expect from 'expect';
import reducer from '../../src/reducers/mapReducer';
import * as actions from '../../src/actions/mapActions';


describe('Map reducer', () => {
  const initialState = false;
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update "clear" state after correspondant action has been dispatched', () => {
    const action = actions.clearMap();
    const newState = reducer(initialState, action);
    expect(newState).toEqual(true);
  });
});
