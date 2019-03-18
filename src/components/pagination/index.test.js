import React from 'react';
import { mount } from 'enzyme';
import muiTheme from '../../root/mui-theme';
import Pagination from './component';

describe('Pagination', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Pagination onChangePage={() => {}}>children</Pagination>, muiTheme);
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('page number > 1', () => {
    wrapper.setProps({ pageNumber: 2, maxPageCount: 10 });
    expect(wrapper).toMatchSnapshot();
  });

  test('click on prev page', () => {
    const onChangePage = jest.fn();
    wrapper
      .setProps({ onChangePage, pageNumber: 2 })
      .find("button[title='Previous page']")
      .simulate('click');
    expect(onChangePage).toBeCalledWith(1);
  });

  test('click on prev page', () => {
    const onChangePage = jest.fn();
    wrapper
      .setProps({ onChangePage, pageNumber: 2, maxPageCount: 10 })
      .find("button[title='Next page']")
      .simulate('click');
    expect(onChangePage).toBeCalledWith(3);
  });

  test('on change input with min and max value', () => {
    const onChangePage = jest.fn();
    wrapper.setProps({ onChangePage, maxPageCount: 10 });
    const mockedEventMin = {
      target: {
        value: 0,
      },
    };
    const mockedEventMax = {
      target: {
        value: 20,
      },
    };
    const input = wrapper.find('input');

    input.simulate('change', mockedEventMin);
    expect(onChangePage).toBeCalledWith(1);

    input.simulate('change', mockedEventMax);
    expect(onChangePage).toBeCalledWith(10);
  });
});
