import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { api } from '../../api/fetcher';
import { Sidebar, Table, Content } from '../../components';
import styles from './styles';

export const MainPageContext = React.createContext({});

class Main extends Component {
  state = {
    words: [],
  };

  handleFetchWords = () =>
    api.getWordsList()
      .then(words => this.setState({ words }));

  handleAddWord = data =>
    api.addWord({ ...data })
      .then(() => this.handleFetchWords());

  handleDeleteWord = id =>
    api.deleteWord(id)
      .then(() => this.handleFetchWords());

  handleSearchWord = params =>
    api.searchWord(params);

  componentDidMount() {
    this.handleFetchWords();
  }

  render() {
    const { classes } = this.props;
    const { words } = this.state;

    return (
      <MainPageContext.Provider
        value={{
          words: words,
          fetchWordsList: this.handleFetchWords,
          addWord: this.handleAddWord,
          deleteWord: this.handleDeleteWord,
        }}
      >
        <div className={classes.main}>
          <Sidebar
            searchWord={this.handleSearchWord}
            addWord={this.handleAddWord}
          />
          <Content>
            <Table
              deleteWord={this.handleDeleteWord}
              fetchWords={this.handleFetchWords}
              words={words}
            />
          </Content>
        </div>
      </MainPageContext.Provider>
    );
  }
}

const enhance = compose(
  injectSheet(styles)
);

export default enhance(Main);
