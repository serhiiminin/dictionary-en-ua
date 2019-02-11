import React from 'react';
import { shallow } from 'enzyme';
import BlocksWrapper from '.';

describe('Blocks Container', () => {
  test('render', () => {
    const wrapper = shallow(<BlocksWrapper>Anything</BlocksWrapper>);

    expect(wrapper).toMatchSnapshot();
  });
});
