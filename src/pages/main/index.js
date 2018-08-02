import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import ResizeDetector from 'react-resize-detector';
import { api } from '../../api/fetcher';
import { Sidebar, Table, Content } from '../../components';
import styles from './styles';

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
      <div className={classes.main}>
        <Sidebar
          searchWord={this.handleSearchWord}
          addWord={this.handleAddWord}
        />
        <Content>
          <ResizeDetector
            handleWidth
            handleHeight
            render={({ width }) => (
              <Table
                screenWidth={width}
                deleteWord={this.handleDeleteWord}
                fetchWords={this.handleFetchWords}
                words={words}
              />
            )}
          />
        </Content>
      </div>
    );
  }
}

const enhance = compose(
  injectSheet(styles)
);

export default enhance(Main);
