import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { mockGoogleAPI } from '../helpers/mockGoogleAPI';
import { Map } from '../../src/components/Map';

const setup = () => {
  const props = {
    currentRoute: {},
    savedRoutes: []
  }
  return shallow(<Map {...props} />);
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

  it('renders 2 buttons', () => {
    const component = setup();
    expect(component.find('button').length).toBe(2);
  });

  it('renders details element', () => {
    const component = setup();
    expect(component.find('details').length).toBe(1);
  });

  it('calls componentWillReceiveProps method when receives new props', () => {
    const spy = sinon.spy(Map.prototype, 'componentWillReceiveProps');
    const component = setup();
    global.google = mockGoogleAPI();

    component.setProps({ isScriptLoaded: true, isScriptLoadSucceed:true });
    expect(spy.calledOnce).toBe(true);
    spy.restore();
  });
});
