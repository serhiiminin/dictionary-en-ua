import React from 'react';
import { shallow } from 'enzyme';
import Header from './component';

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
