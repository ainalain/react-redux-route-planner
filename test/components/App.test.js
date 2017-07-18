import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import App from '../../src/components/App';

//the idea from https://medium.freecodecamp.com/the-right-way-to-test-react-components-548a4736ab22
describe('App', () => {
  it('always renders a div', () => {
    const component = shallow(<App />);
    const divs = component.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('contains everything else that gets rendered', () => {
      const component = shallow(<App />);
      const divs = component.find('div');
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(component.children());
    });

  it('renders Header component', () => {
    const component = shallow(<App />);
    expect(component.find('Header').length).toBe(1);
  });

  it('renders connected component', () => {
    const component = shallow(<App />);
    expect(component.find('Connect').length).toBe(1);
  });
});
