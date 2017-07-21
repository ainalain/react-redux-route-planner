import expect from 'expect';
import getUserPosition from '../../src/helpers/geolocation';

describe('Geolocation function', () => {
  it('should return null', () => {
    expect(getUserPosition()).toBe(null);
  });
});
