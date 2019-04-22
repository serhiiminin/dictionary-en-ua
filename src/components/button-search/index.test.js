import React from 'react';
import { shallow } from 'enzyme';
import ButtonSearch from '.';

describe('Button control', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ButtonSearch>Text</ButtonSearch>);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('isActive', () => {
    wrapper.setProps({ isActive: true });
    expect(wrapper).toMatchSnapshot();
  });
});
