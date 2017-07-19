import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import MapHeader from '../../../src/components/map/MapHeader';

describe('MapHeader with shallow rendering', () => {
  let component;
  beforeEach(() => {
    const props = {
      calculateRoute: () => {},
      updateHistory: () => {}
    };
    component = shallow(<MapHeader {...props} /> );
  });

  it('always renders a header tag', () => {
    expect(component.find('header').length).toBe(1);
  });

  it('renders 2 Button components', () => {
    expect(component.find('Button').length).toBe(2);
  });
});
