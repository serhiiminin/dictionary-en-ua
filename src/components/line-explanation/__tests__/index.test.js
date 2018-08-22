import React from 'react';
import renderer from 'react-test-renderer';
import LineExplanation from '..';


describe('Controls separator', () => {
  const component = renderer.create(
    <LineExplanation label="label">
      description
    </LineExplanation>
  );
  const tree = component.toJSON();

  test('render', () => {
    expect(tree).toMatchSnapshot();
  });
});
