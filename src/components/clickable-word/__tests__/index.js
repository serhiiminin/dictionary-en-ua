import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ClickableWord from '..';

describe('Clickable Word', () => {
  const component = renderer.create(
    <ClickableWord
      word='word'
      onClick={() => {}}
    />
  );
  const tree = component.toJSON();

  test('render', () => {
    expect(tree).toMatchSnapshot();
  });

  test('onClick', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <ClickableWord
        word='word'
        onClick={fn}
      />
    );

    wrapper.simulate('click', { preventDefault() {} });
    expect(fn).toHaveBeenCalled();
  });
});
