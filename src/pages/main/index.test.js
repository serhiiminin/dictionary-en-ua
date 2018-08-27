import React from 'react';
import { shallow } from 'enzyme';
import Main from '.';

describe('Main page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Main/>
    );
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
