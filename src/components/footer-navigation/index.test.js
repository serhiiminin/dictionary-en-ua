import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import FooterNavigation from './component';

describe('FooterNavigation', () => {
  test('render', () => {
    const wrapper = mount(
      <Router>
        <FooterNavigation>anything</FooterNavigation>
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
