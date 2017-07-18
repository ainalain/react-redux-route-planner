import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { mockGoogleAPI } from '../helpers/mockGoogleAPI';
import { Map } from '../../src/components/Map';

const setup = () => {
  return shallow(<Map />);
};

describe('Map with shallow rendering', () => {
  it('always renders a section', () => {
    const component = setup();
    const divs = component.find('section');
    expect(component.find('section').length).toBe(1);
  });

  it('renders a header element', () => {
    const component = setup();
    expect(component.find('header').length).toBe(1);
  });

  it('renders a button', () => {
    const component = setup();
    expect(component.find('button').length).toBe(1);
  });
  it('renders a button', () => {
    const spy = sinon.spy(Map.prototype, 'componentWillReceiveProps');
    const component = setup();
    global.google = mockGoogleAPI();

    component.setProps({ isScriptLoaded: true, isScriptLoadSucceed:true });
    expect(spy.calledOnce).toBe(true);
  });
});
