import expect from 'expect';
import React from 'react';
import { shallow, mount  } from 'enzyme';
import mockGoogleAPI from '../helpers/mockGoogleAPI';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedMarker, { Marker } from '../../src/components/Marker';
import styles from '../../src/components/Marker.scss';

describe('Marker with shallow rendering', () => {
  const props = {
    map: {},
    google: mockGoogleAPI(),
    position: {
      lat: 50.0614238,
      lng: 19.9515069
    }
  };
  it('always renders a div with correspondant class ', () => {
    const component = shallow(<Marker {...props} />);
    expect(component.find(`div.${styles.marker}`).length).toBe(1);
  });

  describe('Connected Marker test', () => {
    const mockStore = configureStore([thunk]);

    it('it renders connected component', () => {
      const store = mockStore({
        currentRoute: {},
        savedRoutes: [],
        error: ''
      });

      const component = mount(
        <Provider store={store}>
          <ConnectedMarker {...props} />
        </Provider>)
      expect(component.find(ConnectedMarker).length).toBe(1);
    });
  });
});
