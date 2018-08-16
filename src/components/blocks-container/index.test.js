import React from 'react';
import renderer from 'react-test-renderer';
import BlockContainer from '.';


describe('Block Container', () => {
  const component = renderer.create(
    <BlockContainer>Anything</BlockContainer>
  );

  test('render', () => {
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
