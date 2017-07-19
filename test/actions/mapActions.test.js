import * as actions from '../../src/actions/mapActions';
import * as types from '../../src/actions/actionTypes';
import expect from 'expect';

describe('Map actions', () => {
  it('should create a CLEAR_MAP action', () => {
    const expectedAction = {
      type: types.CLEAR_MAP
    };
    const action = actions.clearMap();
    expect(action).toEqual(expectedAction);
  });
});
