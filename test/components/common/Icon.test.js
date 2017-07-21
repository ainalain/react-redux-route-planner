import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Icon from '../../../src/components/common/Icon';
import Car from '../../../src/assets/icons/car.svg';

describe('Icon', () => {
  it('renders an svg element', () => {
    const component = shallow(<Icon glyph={Car} />);
    expect(component.find('svg').length).toBe(1);
  });
});
