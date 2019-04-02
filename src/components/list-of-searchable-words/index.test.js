import React from 'react';
import { shallow } from 'enzyme';
import muiTheme from '../../root/mui';
import ListOfSearchableWords from '.';

describe('List of clickable strings', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ListOfSearchableWords theme={muiTheme} items={['one', 'two']} onClick={() => {}} />);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
