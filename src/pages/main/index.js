import React, { Component } from 'react';
import { WordsList } from '../../components/words-list';
import { WordsListItem } from '../../components/words-list-item';
import { api } from '../../api/fetcher';

class Main extends Component {
  state = {
    words: [],
  };
  componentDidMount() {
    api.getWordsList()
      .then(words => this.setState({ words }))
  }
  render() {
    const { words } = this.state;
    return (
      <WordsList>
        {words.map(word => (
          <WordsListItem word={word} key={word._id}/>
        ))}
      </WordsList>
    )
  }
}

export { Main };
