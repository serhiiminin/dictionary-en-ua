import React from 'react';
import { shallow } from 'enzyme'
import ButtonWithRouter from './component';

describe('Button with Router', () => {
  const wrapper = shallow(
    <ButtonWithRouter to='/anywhere'>
      Anywhere
    </ButtonWithRouter>
  );

  // console.log(wrapper.debug());
  test('render', () => {

    expect(wrapper).toMatchSnapshot();
  });

  // test('onClick', () => {
  //   tree.props.onClick();
  //   tree = component.toJSON();
  //   expect(tree)
  //     .toMatchSnapshot();
  // });
});
