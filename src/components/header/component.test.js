import React from 'react';
import { shallow } from 'enzyme';
import Header from '.';

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Header/>
    );
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
