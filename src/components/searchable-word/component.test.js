import React from 'react';
import { shallow } from 'enzyme';
import SearchableWord from './component';

describe('Clickable Word', () => {
  test('render', () => {
    const wrapper = shallow(
      <SearchableWord
        word='word'
        onClick={() => {}}
      />
    );

    expect(wrapper.text()).toEqual('word');
  });

  test('onClick', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <SearchableWord
        word='word'
        onClick={fn}
      />
    );

    wrapper.simulate('click', { preventDefault() {} });
    expect(fn).toHaveBeenCalled();
  });
});
