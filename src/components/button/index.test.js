import React from 'react';
import { shallow } from 'enzyme';
import ButtonCustomized from './component';

describe('Button with Router', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ButtonCustomized to="/anywhere" title="anything" />);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
