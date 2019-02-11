import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import WordItemInList from './component';

describe('WordItemInList', () => {
  const word = {
    _id: '_id',
    en: 'en',
    uk: 'uk',
    transcription: 'transcription',
    dateCreated: '2000-02-02',
    dateLastLearnt: '2000-02-02',
  };
  test('render', () => {
    const wrapper = mount(
      <Router>
        <WordItemInList word={word}>Anything</WordItemInList>
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('loading', () => {
    const wrapper = mount(
      <Router>
        <WordItemInList loading word={word}>
          Anything
        </WordItemInList>
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
