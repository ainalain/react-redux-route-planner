import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Modal from '../../../src/components/common/Modal';
import styles from '../../../src/components/common/Modal.scss';


describe('Modal with shallow rendering', () => {
  let component;
  beforeEach(() => {
    const props = {
      error: 'error string',
      onClick: () => {},
      hidden: false
    };
    component = shallow(<Modal {...props} /> );
  });

  it('always renders a "backdrop" div tag', () => {
    expect(component.find(`div.${styles.backdrop}`).length).toBe(1);
  });

  it('always renders a "modal" div tag', () => {
    expect(component.find(`div.${styles.modal}`).length).toBe(1);
  });

  it('renders a Button components ', () => {
    expect(component.find('Button').length).toBe(1);
  });
});
