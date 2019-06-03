import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { parseSearch } from 'url-joiner';

class SearchWordContainer extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    handleSearchWord: PropTypes.func.isRequired,
    cleanWord: PropTypes.func.isRequired,
    wordItem: PropTypes.shape({}),
  };

  static defaultProps = {
    wordItem: null,
  };

  componentDidMount() {
    const { location, handleSearchWord } = this.props;
    const { query } = parseSearch(location.search);
    if (query) {
      handleSearchWord(query);
    }
  }

  componentWillUnmount() {
    this.props.cleanWord();
  }

  render() {
    const { wordItem } = this.props;

    return (
      <div>
        <h2>Search</h2>
        <p>{wordItem.word}</p>
        <p>{wordItem.transcription}</p>
        <img src={wordItem.gif} alt={wordItem.word} />
      </div>
    );
  }
}

export default SearchWordContainer;
