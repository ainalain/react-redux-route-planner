import 'jsdom-global/register';
import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mockGoogleAPI from '../helpers/mockGoogleAPI';
import ConnectedMap, { Map } from '../../src/components/Map';
import styles from '../../src/components/Map.scss';

const setup = () => {
  const props = {
    currentRoute: {},
    savedRoutes: [],
    error: ''
  }
  return shallow(<Map {...props} />);
};

describe('Map with shallow rendering', () => {
  it('always renders a section', () => {
    const component = setup();
    const divs = component.find('section');
    expect(component.find('section').length).toBe(1);
  });

  it('renders a MapHeader component', () => {
    const component = setup();
    expect(component.find('MapHeader').length).toBe(1);
  });

  it('renders details element', () => {
    const component = setup();
    expect(component.find('details').length).toBe(1);
  });

  it('calls componentWillReceiveProps method when receives new props', () => {
    const spy = sinon.spy(Map.prototype, 'componentWillReceiveProps');
    const component = setup();
    global.google = mockGoogleAPI({ self: component});

    component.setProps({ isScriptLoaded: true, isScriptLoadSucceed:true });
    expect(spy.calledOnce).toBe(true);
    spy.restore();
  });

  describe('Connected Map test', () => {
    const mockStore = configureStore([thunk]);

    it('it renders connected component', () => {
      const store = mockStore({
        currentRoute: {},
        savedRoutes: [],
        error: ''
      });

      const component = mount(
        <Provider store={store}>
          <ConnectedMap />
        </Provider>)
      expect(component.find(ConnectedMap).length).toBe(1);
    });
  });
});
