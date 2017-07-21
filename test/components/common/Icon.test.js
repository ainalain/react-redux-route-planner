import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Icon from '../../../src/components/common/Icon';
import Car from '../../../src/assets/icons/car.svg';

describe('Icon', () => {
  const props = {
    glyph: Car,
    onClick: () => {},
    mode: ''
  };
  it('renders an svg element', () => {
    const component = shallow(<Icon {...props} />);
    expect(component.find('svg').length).toBe(1);
  });
});
