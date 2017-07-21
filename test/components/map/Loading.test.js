import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Loading from '../../../src/components/map/Loading';
import styles from '../../../src/components/map/Loading.scss';

describe('Loading with shallow rendering', () => {
  let component;
  beforeEach(() => {
    const props = {
      ajaxCallInProgress: false
    };
    component = shallow(<Loading {...props} /> );
  });

  it('render an img element', () => {
    expect(component.find('img').length).toBe(1);
  });

  it('has a "hidden" css class', () => {
    expect(component.find(`div.${styles.hidden}`).length).toBe(1);
  });
});
