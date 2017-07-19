import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import ListItem from '../../src/components/common/ListItem';

describe('ListItem with shallow rendering', () => {
  it('always renders a li tag', () => {
    const props = {
      item: {},
      onClick: () => {},
      index: '0'
    };
    const component = shallow(<ListItem {...props} />);
    expect(component.find('li').length).toBe(1);
  });
});
