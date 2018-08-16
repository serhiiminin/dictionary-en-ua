import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonWithRouter from '..';


describe('Button with Router', () => {
  const component = renderer.create(
    <Router keyLength={0}>
      <ButtonWithRouter to='/anywhere'>Anywhere</ButtonWithRouter>
    </Router>
  );
  let tree = component.toJSON();

  test('render', () => {
    expect(tree).toMatchSnapshot();
  });

  test('onClick', () => {
    tree.props.onClick();
    tree = component.toJSON();
    expect(tree)
      .toMatchSnapshot();
  });
});
