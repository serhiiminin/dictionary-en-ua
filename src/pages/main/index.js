import React, { Component } from 'react';
import { Form } from '../../components/form';
import { WordsList } from '../../components/words-list';
import { WordsListItem } from '../../components/words-list-item';
import { BlocksContainer } from '../../components/blocks-container';
import { api } from '../../api/fetcher';
import { Sidebar } from '../../components/sidebar';
import { Content } from '../../components/content';

class Main extends Component {
  state = {
    words: [],
  };

  handleFetchWords = () =>
    api.getWordsList()
      .then(words => this.setState({ words }));

  handleAddWord = data =>
    api.addWord({ ...data });

  componentDidMount() {
    this.handleFetchWords();
  }

  render() {
    const { words } = this.state;
    return (
      <BlocksContainer>
        <Sidebar>
          <Form
            fetchWords={this.handleFetchWords}
            addWord={this.handleAddWord}
          />
        </Sidebar>
        <Content>
          <WordsList>
            {words.map(word => (
              <WordsListItem word={word} key={word._id}/>
            ))}
          </WordsList>
        </Content>
      </BlocksContainer>
    );
  }
}

export { Main };
