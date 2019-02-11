import React from 'react';
import { shallow } from 'enzyme';
import ButtonControl from '.';

describe('Button control', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ButtonControl>Text</ButtonControl>);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('isActive', () => {
    wrapper.setProps({ isActive: true });
    expect(wrapper).toMatchSnapshot();
  });
});
