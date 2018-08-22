import React from 'react';
import renderer from 'react-test-renderer';
import { LineExplanation } from '..';


describe('Line explanation', () => {
  const component = renderer.create(
    <LineExplanation
      label='label'
    >text</LineExplanation>
  );
  const tree = component.toJSON();

  test('render', () => {
    expect(tree).toMatchSnapshot();
  });
});
