import React from 'react';
import { shallow } from 'enzyme';
import BlocksWrapper from './component';

describe('Blocks Container', () => {
  test('render', () => {
    const wrapper = shallow(
      <BlocksWrapper>
        Anything
      </BlocksWrapper>
    );

    expect(wrapper.contains('Anything')).toMatchSnapshot();
  });
});
