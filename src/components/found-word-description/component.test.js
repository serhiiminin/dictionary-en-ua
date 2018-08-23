import React from 'react';
import { shallow } from 'enzyme';
import FoundWordDescription from './component';

describe('Clickable Word', () => {

  test('Empty found word', () => {
    const wrapper = shallow(
      <FoundWordDescription
        foundWord={{}}
        pushTextToInput={() => {}}
      />
    );

    expect(wrapper.closest('div').text()).toEqual('Here will be detailed description');
  });

  test('Received just translation', () => {
    const wrapper = shallow(
      <FoundWordDescription
        foundWord={{
          en: 'en',
          ru: 'ru',
        }}
        pushTextToInput={() => {}}
      />
    );

    expect(wrapper.find('Jss(LineExplanation)')).toHaveLength(7);
    expect(wrapper
      .findWhere(node => node.props().label === 'English')
      .contains('en')
    ).toBeTruthy();
    expect(wrapper
      .findWhere(node => node.props().label === 'Russian')
      .contains('ru')
    ).toBeTruthy();
  });

  test('Received part of speech', () => {
    const wrapper = shallow(
      <FoundWordDescription
        foundWord={{
          partOfSpeech: ['noun']
        }}
        pushTextToInput={() => {}}
      />
    );

    expect(wrapper.contains('noun')).toBeTruthy();
  });
});
