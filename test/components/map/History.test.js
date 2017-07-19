import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import History from '../../../src/components/map/History';

describe('History with shallow rendering', () => {
  let component;
  beforeEach(() => {
    const props = {
      items: [{}, {}],
      onItemClick: () => {}
    };
    component = shallow(<History {...props} /> );
  });

  it('always renders an ul tag', () => {
    expect(component.find('ul').length).toBe(1);
  });

  it('renders ListItems components in provided with props count', () => {
    expect(component.find('ListItem').length).toBe(2);
  });
});
