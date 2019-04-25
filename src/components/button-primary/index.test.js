import React from 'react';
import { shallow } from 'enzyme';
import ButtonPrimary from '.';

describe('Button control', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ButtonPrimary>Text</ButtonPrimary>);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('isActive', () => {
    wrapper.setProps({ isActive: true });
    expect(wrapper).toMatchSnapshot();
  });
});
