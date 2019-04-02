import React from 'react';
import { mount } from 'enzyme';
import muiTheme from '../../root/mui';
import MultipleInputs from './component';

describe('Multiple Inputs', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MultipleInputs onRemoveItem={() => {}} onChange={() => {}}>
        text
      </MultipleInputs>,
      muiTheme
    );
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('disabled', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  test('render with one item and check methods', () => {
    wrapper.setProps({
      items: [
        {
          id: '1',
          value: '1',
        },
      ],
    });
    expect(wrapper.children().length).toBe(1);

    const input = wrapper.find('input');
    const onChange = jest.fn();
    wrapper.setProps({ onChange });
    input.simulate('change');
    expect(onChange).toHaveBeenCalled();

    const button = wrapper.find('button');
    const onRemoveItem = jest.fn();
    wrapper.setProps({ onRemoveItem });
    button.simulate('click');
    expect(onRemoveItem).toHaveBeenCalled();
  });
});
