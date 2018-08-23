import React from 'react';
import renderer from 'react-test-renderer';
import ListOfClickableStrings from './component';

describe('List of clickable strings', () => {
  const component = renderer.create(
    <ListOfClickableStrings
      items={['one', 'two']}
      onClick={() => {}}
    />
  );
  const tree = component.toJSON();

  test('render', () => {
    expect(tree).toMatchSnapshot();
  });
});
