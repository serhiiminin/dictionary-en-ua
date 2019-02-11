import React from 'react';
import { shallow } from 'enzyme';
import SearchableWord from './component';

describe('Searchable Word', () => {
  test('render', () => {
    const wrapper = shallow(<SearchableWord word="word" />);
    expect(wrapper).toMatchSnapshot();
  });
});
