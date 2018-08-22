import React from 'react';
import { shallow } from 'enzyme';
import ClickableWord from '../clickable-word';

describe('Clickable Word', () => {

  test('render', () => {
    const wrapper = shallow(
      <ClickableWord
        word='word'
        onClick={() => {}}
      />
    );

    expect(wrapper.text()).toEqual('word');
  });

  test('onClick', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <ClickableWord
        word='word'
        onClick={fn}
      />
    );

    wrapper.simulate('click', { preventDefault() {} });
    expect(fn).toHaveBeenCalled();
  });
});
