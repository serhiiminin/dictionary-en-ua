import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from '.';

describe('Notification item', () => {
  test('render', () => {
    const wrapper = shallow(
      <NotificationItem
        onClick={() => {}}
        status='exited'
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
