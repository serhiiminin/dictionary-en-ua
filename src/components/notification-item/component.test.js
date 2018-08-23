import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './component';

describe('Notification item', () => {
  test('render', () => {
    const wrapper = shallow(
      <NotificationItem
        onClick={() => {}}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
