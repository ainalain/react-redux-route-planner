import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import { Map} from '../../src/components/Map';

describe('Map with shallow rendering', () => {
  it('always renders a section', () => {
    const component = shallow(<Map />);
    const divs = component.find('section');
    expect(component.find('section').length).toBe(1);
  });

  it('renders a header element', () => {
    const component = shallow(<Map />);
    expect(component.find('header').length).toBe(1);
  });

  it('renders a button', () => {
    const component = shallow(<Map />);
    expect(component.find('button').length).toBe(1);
  });
});
