import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { parseSearch, joinUrl, mergeSearch } from 'url-joiner';
import routes from '../../../routes';

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
    this.handleSearch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.handleSearch();
    }
  }

  componentWillUnmount() {
    this.props.cleanWord();
  }

  handleSearch = () => {
    const { location, handleSearchWord } = this.props;
    const { query } = parseSearch(location.search);

    if (query) {
      handleSearchWord(query);
    }
  };

  render() {
    const { wordItem } = this.props;
    const { options } = wordItem;

    return (
      <div>
        <h2>Search</h2>
        <p>{wordItem.word}</p>
        {options && <p>Maybe you meant:</p>}
        <ul>
          {options &&
            options.map(item => {
              const query = encodeURIComponent(item).replace(/%20/gi, '+');
              const to = joinUrl(routes.words.search, mergeSearch({ query }));

              return (
                <li key={to}>
                  <Link to={to}>{item}</Link>
                </li>
              );
            })}
        </ul>
        <p>{wordItem.transcription}</p>
        <img src={wordItem.gif} alt={wordItem.word} />
      </div>
    );
  }
}

export default SearchWordContainer;
