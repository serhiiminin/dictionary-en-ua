import React from 'react';
import { shallow } from 'enzyme';
import LineExplanation from '.';

describe('Line explanation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <LineExplanation
        label='label'
      >text</LineExplanation>
    );
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
