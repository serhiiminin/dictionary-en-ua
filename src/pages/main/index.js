import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { api } from '../../api/fetcher';
import { Form, BlocksContainer, Sidebar, Content, WordsList, WordsListItem } from '../../components';
import styles from './styles';

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
    const { classes } = this.props;
    const { words } = this.state;
    return (
      <BlocksContainer>
        <div className={classes.root}>
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
        </div>
      </BlocksContainer>
    );
  }
}

const enhance = compose(
  injectSheet(styles)
);

export default enhance(Main);
