import React from 'react';
import { shallow } from 'enzyme';
import Component from '.';

describe('Root', (): void => {
  let wrapper: object;

  beforeEach((): void => {
    wrapper = shallow(<Component />);
  });

  test('render', (): void => {
    expect(wrapper).toMatchSnapshot();
  });
});
