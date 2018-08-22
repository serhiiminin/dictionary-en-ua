import React from 'react';
import renderer from 'react-test-renderer';
import ClickableString from '..';

describe('Clickable string', () => {
  const event = { preventDefault: () => {} };
  const component = renderer.create(
    <ClickableString
      item='String'
      onClick={() => { event.preventDefault(); }}
    />
  );
  let tree = component.toJSON();

  test('render', () => {
    expect(tree).toMatchSnapshot();
  });

  test('delimiter', () => {
    tree.props.delimiter=',';
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
