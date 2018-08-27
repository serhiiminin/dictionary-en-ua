import React from 'react';
import { shallow } from 'enzyme';
import ButtonWithRouter  from './component';

describe('Button with Router', () => {
  let wrapper;
  const push = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ButtonWithRouter
        to='/anywhere'
        history={{ push, }}
      >Anywhere</ButtonWithRouter>
    )
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('onClick', () => {
    wrapper.simulate('click');
    expect(wrapper).toMatchSnapshot();
    expect(push).toHaveBeenCalled();
  });
});
