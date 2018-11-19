import React from 'react';
import { shallow } from 'enzyme';
import WordsList from './container';

describe('MainContainer page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <WordsList/>
    );
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
