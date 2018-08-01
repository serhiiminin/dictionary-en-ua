import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { api } from '../../api/fetcher';
import { Form, BlocksContainer, Sidebar, Table, Content, SearchBlock } from '../../components';
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

  handleDeleteWord = id =>
    api.deleteWord(id);

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
            <SearchBlock
              fetchWords={this.handleFetchWords}
              addWord={this.handleAddWord}
            />
          </Sidebar>
          <Content>
            <Table
              deleteWord={this.handleDeleteWord}
              fetchWords={this.handleFetchWords}
              words={words}
            />
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
