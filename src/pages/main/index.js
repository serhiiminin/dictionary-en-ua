import React, { Component } from 'react';
import { WordsList } from '../../components/words-list';
import { WordsListItem } from '../../components/words-list-item';
import { BlocksContainer } from '../../components/blocks-container';
import { Form } from '../../components/form';
import { api } from '../../api/fetcher';

class Main extends Component {
  state = {
    words: [],
  };

  componentDidMount() {
    api.getWordsList()
      .then(words => this.setState({ words }));
  }

  handleSaveWords = words => {
    this.setState({ words })
  }
  render() {
    const { words } = this.state;
    return (
      <BlocksContainer>
        <Form saveWords={this.handleSaveWords}/>
        <WordsList>
          {words.map(word => (
            <WordsListItem word={word} key={word._id}/>
          ))}
        </WordsList>
      </BlocksContainer>
    );
  }
}

export { Main };
