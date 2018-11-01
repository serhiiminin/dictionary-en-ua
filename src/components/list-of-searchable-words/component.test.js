import React from 'react';
import { shallow } from 'enzyme';
import ListOfSearchableWords from '.';

describe('List of clickable strings', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ListOfSearchableWords
        items={['one', 'two']}
        onClick={() => {}}
      />
    );
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
