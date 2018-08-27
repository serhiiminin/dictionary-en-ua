import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './component';

describe('Notifications', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Notifications
        notifications={[]}
        hideNotification={() => {}}
      >
        children
      </Notifications>
    );
  });
  test('render empty', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('render with one item', () => {
    wrapper.setProps({
      notifications: [{
        id: 'id',
        text: 'text',
        type: 'success',
      }]
    });
    expect(wrapper).toMatchSnapshot();
  })
});
