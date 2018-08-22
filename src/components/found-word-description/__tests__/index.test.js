import React from 'react';
import renderer from 'react-test-renderer';
import FoundWordDescription from '..';

describe('Found word description', () => {
  const component = renderer.create(
    <FoundWordDescription
      pushTextToInput={() => {}}
      foundWord={{ partOfSpeech: ['noun'] }}
    />
  );
  let tree = component.toJSON();

  test('render', () => {
    expect(tree)
      .toMatchSnapshot();
  });

  test('get empty foundWord', () => {
    const componentWithEmptyWord = renderer.create(
      <FoundWordDescription
        pushTextToInput={() => {}}
        foundWord={{}}
      />
    );
    const treeWithEmptyWord = componentWithEmptyWord.toJSON();

    expect(treeWithEmptyWord).toMatchSnapshot();
  });

  test('get partOfSpeech inside foundWord', () => {
    tree.props.foundWord = {
      partOfSpeech: ['noun'],
    };
    tree = component.toJSON();
    expect(tree)
      .toMatchSnapshot();
  });
  test('get en inside foundWord', () => {
    tree.props.foundWord = {
      en: 'en',
    };
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
