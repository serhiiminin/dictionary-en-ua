import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import WordPreview, { mapValues } from '.';

describe('mapValues', () => {
  test('correct data', () => {
    const arr = [{ id: '1', value: 'text' }];
    expect(mapValues(arr)).toEqual(['text']);
  });
});

describe('WordForm', () => {
  let wrapper;
  const word = {
    _id: '1',
    transcription: 'transcription',
    synonyms: [{ id: '34', value: 'day' }],
    partOfSpeech: [{ id: '55', value: 'noun' }],
    examples: [{ id: '8', value: 'example' }],
  };

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <WordPreview word={word}>Anything</WordPreview>
      </Router>
    );
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
