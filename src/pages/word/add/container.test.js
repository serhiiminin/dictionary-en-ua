import React from 'react';
import { shallow } from 'enzyme';
import AddWord from './container';

describe('MainContainer page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddWord />);
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
