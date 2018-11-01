import React from 'react';
import { shallow } from 'enzyme';
import TextFieldLoading from '.';

describe('Text field loading', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <TextFieldLoading/>
    )
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  })
});

