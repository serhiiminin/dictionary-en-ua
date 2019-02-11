import React from 'react';
import { mount } from 'enzyme';
import Toolbar from './component';

describe('Toolbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Toolbar onChangeSortBy={() => {}} onChangeSortDirection={() => {}}>
        <div className="test-example">anything</div>
      </Toolbar>
    );
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('isAnyChecked = true', () => {
    wrapper.setProps({ isAnyChecked: true });
    expect(wrapper.exists('.test-example')).toBeTruthy();
  });
  test('sortDirection = descend', () => {
    wrapper.setProps({ sortDirection: 'descend' });
    expect(wrapper.exists('KeyboardArrowDown')).toBeTruthy();
  });
});
