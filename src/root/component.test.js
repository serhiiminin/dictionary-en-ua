import React from 'react';
import { shallow } from 'enzyme';
import Root from './component';

describe('Root', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Root/>
    );
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
