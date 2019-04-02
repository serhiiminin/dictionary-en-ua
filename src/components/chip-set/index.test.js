import React from 'react';
import { mount } from 'enzyme';
import muiTheme from '../../root/mui';
import ChipSet from './component';

describe('Chip set', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ChipSet
        theme={muiTheme}
        items={[
          {
            value: 'one',
            id: '1',
          },
        ]}
        onRemoveItem={() => {}}
      >
        Text
      </ChipSet>,
      muiTheme
    );
  });

  test('render button', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('disabled', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  test('onDelete', () => {
    const onRemoveItem = jest.fn();
    wrapper.setProps({ onRemoveItem });
    wrapper.find('svg').simulate('click');
    expect(onRemoveItem).toHaveBeenCalled();
  });
});
