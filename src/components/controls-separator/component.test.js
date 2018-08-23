import React from 'react';
import { shallow } from 'enzyme';
import ControlsSeparator from './component';

describe('Controls separator', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ControlsSeparator>
        <button type='button'>anything</button>
        <button type='button'>everything</button>
      </ControlsSeparator>
    );
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('align right', () => {
    wrapper.setProps({ align: 'right' });
    expect(wrapper).toMatchSnapshot();
  });
});
