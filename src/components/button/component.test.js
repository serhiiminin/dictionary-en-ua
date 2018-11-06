import React from 'react';
import { shallow } from 'enzyme';
import Button from '.';

describe('Controls separator', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Button>
        Text
      </Button>
    );
  });

  test.only('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('isActive', () => {
    wrapper.setProps({ isActive: true });
    expect(wrapper).toMatchSnapshot();
  });
});
