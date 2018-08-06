import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import ResizeDetector from 'react-resize-detector';
import { api } from '../../api/fetcher';
import { Sidebar, Table, Content } from '../../components';
import styles from './styles';

class Main extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    words: [],
  };

  componentDidMount() {
    this.handleFetchWords();
  }

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
