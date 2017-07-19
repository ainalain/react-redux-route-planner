import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Button from '../../../src/components/common/Button';

describe('Button with shallow rendering', () => {
  let component;
  beforeEach(() => {
    const props = {
      test: 'test',
      onClick: () => {},
      cssClass: 'testClass'
    };
    component = shallow(<Button {...props} /> );
  });

  it('always renders a button tag', () => {
    expect(component.find('button').length).toBe(1);
  });
});
