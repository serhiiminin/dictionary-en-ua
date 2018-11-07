import React from 'react';
import { mount } from 'enzyme';
import muiTheme from '../../root/mui-theme';
import Button from '.';

describe('Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Button theme={muiTheme}>
        Text
      </Button>
    );
  });

  test('render button', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('render link', () => {
    wrapper.setProps({ href: 'https://google.com' });
    expect(wrapper).toMatchSnapshot();
  });

  test('isActive', () => {
    wrapper.setProps({ isActive: true });
    expect(wrapper).toMatchSnapshot();
  });
});
