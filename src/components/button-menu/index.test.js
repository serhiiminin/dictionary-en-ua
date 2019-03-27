import React from 'react';
import { shallow } from 'enzyme';
import ButtonMenu from '.';

describe('Button control', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ButtonMenu>Text</ButtonMenu>);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('isActive', () => {
    wrapper.setProps({ isActive: true });
    expect(wrapper).toMatchSnapshot();
  });
});
