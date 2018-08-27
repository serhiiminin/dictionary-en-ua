import React from 'react';
import { shallow } from 'enzyme';
import ListOfClickableStrings from './component';

describe('List of clickable strings', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ListOfClickableStrings
        items={['one', 'two']}
        onClick={() => {}}
      />
    );
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
