import React from 'react';
import { mount } from 'enzyme';
import muiTheme from '../../root/mui-theme';
import Image from './component';

describe('HeaderNavigation', () => {
  test('render', () => {
    const wrapper = mount(
      <Image theme={muiTheme} src="src" width="300" height="200">
        anything
      </Image>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
