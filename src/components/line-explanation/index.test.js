import React from 'react';
import { shallow } from 'enzyme';
import muiTheme from '../../root/mui';
import LineExplanation from './component';

describe('Line explanation', () => {
  test('render', () => {
    const wrapper = shallow(
      <LineExplanation label="label" theme={muiTheme}>
        text
      </LineExplanation>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
