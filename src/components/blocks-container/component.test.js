import React from 'react';
import { shallow } from 'enzyme';
import BlocksContainer from './component';

describe('Blocks Container', () => {
  test('render', () => {
    const wrapper = shallow(
      <BlocksContainer>
        Anything
      </BlocksContainer>
    );

    expect(wrapper.contains('Anything')).toMatchSnapshot();
  });
});
