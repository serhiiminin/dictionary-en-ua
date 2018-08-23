import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './component';


describe('Header', () => {
  const component = renderer.create(
    <Router keyLength={0}>
      <Header/>
    </Router>
  );
  const tree = component.toJSON();

  test('render', () => {
    expect(tree).toMatchSnapshot();
  });
});
