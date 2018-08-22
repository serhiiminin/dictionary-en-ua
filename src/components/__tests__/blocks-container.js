import React from 'react';
import renderer from 'react-test-renderer';
import { BlocksContainer } from '..';


describe('Blocks Container', () => {
  const component = renderer.create(
    <BlocksContainer>Anything</BlocksContainer>
  );

  test('render', () => {
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
