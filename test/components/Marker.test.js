import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import { mockGoogleAPI } from '../helpers/mockGoogleAPI';
import Marker from '../../src/components/Marker';
import styles from '../../src/components/Marker.scss';

describe('Marker with shallow rendering', () => {
  it('always renders a div with correspondant class ', () => {
    const props = {
      map: {},
      google: mockGoogleAPI(),
      position: {
        lat: 50.0614238,
        lng: 19.9515069
      }
    };
    const component = shallow(<Marker {...props} />);
    expect(component.find(`div.${styles.marker}`).length).toBe(1);
  });

});
