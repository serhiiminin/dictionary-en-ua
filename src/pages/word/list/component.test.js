import React from 'react';
import { shallow } from 'enzyme';
import Component from './component';

describe('MainContainer page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Component />);
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
