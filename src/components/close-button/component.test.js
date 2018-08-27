import React from 'react';
import { shallow } from 'enzyme';
import CloseButton from './component';

describe('Close Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CloseButton
        onClick={() => {}}
      />
    );
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('on click', () => {
    const onClick = jest.fn();

    wrapper.setProps({ onClick });

    wrapper.simulate('click', { preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
    expect(onClick).toHaveBeenCalled();
  });

});
