import React from 'react';
import { shallow } from 'enzyme';
import AddWord from './component';

describe('MainContainer page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AddWord/>
    );
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
