import React from 'react';
import renderer from 'react-test-renderer';
import ListOfClickableStrings from '..';

describe('List of clickable strings', () => {
  const component = renderer.create(
    <ListOfClickableStrings
      items={['One', 'two']}
      onClick={() => {}}
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
