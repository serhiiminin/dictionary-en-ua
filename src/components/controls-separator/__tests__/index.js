import React from 'react';
import renderer from 'react-test-renderer';
import ControlsSeparator from '..';

describe('Controls separator', () => {
  const component = renderer.create(
    <ControlsSeparator>
      <button type='button'>anything</button>
      <button type='button'>anything</button>
    </ControlsSeparator>
  );
  let tree = component.toJSON();

  test('render', () => {
    expect(tree).toMatchSnapshot();
  });

  test('align right', () => {
    tree.props.align='right';
    tree = component.toJSON();
    expect(tree)
      .toMatchSnapshot();
  });
});
