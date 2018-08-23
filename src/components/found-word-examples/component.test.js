import React from 'react';
import { shallow } from 'enzyme';
import FoundWordExample from './component';

describe('Clickable Word', () => {
  test('Empty found word', () => {
    const wrapper = shallow(
      <FoundWordExample
        foundWord={{}}
        pushTextToInput={() => {}}
      />
    );

    expect(wrapper.find('div').at(0).text()).toEqual('No results');
  });

  test('Received examples', () => {
    const wrapper = shallow(
      <FoundWordExample
        foundWord={{
          examples: [{ example: 'example', id: '1'}]
        }}
        pushTextToInput={() => {}}
      />
    );

    expect(wrapper.find('ListOfClickableStrings')).toHaveLength(1);
  });
});
