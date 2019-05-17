import React from 'react';
import { shallow } from 'enzyme';
import SearchWordContainer from '.';

describe('MainContainer page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchWordContainer />);
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
