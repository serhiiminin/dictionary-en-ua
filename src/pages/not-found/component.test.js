import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from './component';

describe('Page not found', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <PageNotFound/>
    );
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
