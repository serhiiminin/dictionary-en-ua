import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinRoute, parseSearchParams } from 'url-joiner';
import uuid from 'uuid';
import {
  Button,
  ControlsSeparator,
  TextFieldLoading,
  WordPreview,
} from '../../components';
import loadingNames from '../../constants/loading-names';
import routes from '../../routes';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import wordShape from '../../constants/shapes';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

class SearchWordContainer extends Component {
  static propTypes = {
    wordItem: wordShape(PropTypes),
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    saveWord: PropTypes.func.isRequired,
    searchWord: PropTypes.func.isRequired,
    cleanWord: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    setWordToState: PropTypes.func.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  static defaultProps = {
    wordItem: null,
    classes: {},
  };

  state = {
    searchValue: '',
    isToEditMode: false,
  };

  componentDidMount() {
    const { location } = this.props;
    const searchParams = parseSearchParams(location.search);

    if (searchParams.query) {
      this.searchWord(searchParams.query);
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const searchParams = parseSearchParams(location.search);

    if (
      this.props.location.search !== prevProps.location.search &&
      searchParams.query
    ) {
      this.searchWord(searchParams.query);
    }
  }

  componentWillUnmount() {
    if (!this.state.isToEditMode) {
      this.props.cleanWord();
    }
  }

  cleanSearchValue = () => this.setState({ searchValue: '' });

  searchWord = word => {
    clearTimeout(this.inputTimer);
    this.setState({ searchValue: word });
    this.inputTimer = setTimeout(() => {
      this.props.searchWord({ word });
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleOnChangeSearchInput = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;

    this.setState({ searchValue: value });

    this.inputTimer = setTimeout(() => {
      this.props.history.push(
        joinRoute({
          pathname: routes.words.search,
          searchParams: { query: value },
        })
      );
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleEditBeforeSaving = () => {
    const { history, setWordToState, wordItem } = this.props;
    this.setState(
      {
        isToEditMode: true,
        searchValue: '',
      },
      () => {
        setWordToState({ ...wordItem, _id: uuid() });
        history.push(routes.words.add);
      }
    );
  };

  handleSaveWord = () => {
    const { saveWord, wordItem, cleanWord } = this.props;

    return saveWord(wordItem).then(() => {
      this.cleanSearchValue();
      return cleanWord();
    });
  };

  render() {
    const { searchValue } = this.state;
    const { wordItem, checkIsLoading, classes } = this.props;
    const isEmpty = !Object.keys(wordItem).length;
    const loading = checkIsLoading(loadingNames.words.search);

    return (
      <main>
        <div className={classes.searchBlock}>
          <TextFieldLoading
            label="Search a word"
            value={searchValue}
            onChange={this.handleOnChangeSearchInput}
            loading={loading}
          />
          <ControlsSeparator align="right">
            <Button
              onClick={this.handleSaveWord}
              disabled={isEmpty}
              variant="contained"
              color="primary"
            >
              Save to my words
            </Button>
            <Button
              onClick={this.handleEditBeforeSaving}
              disabled={isEmpty}
              variant="contained"
              color="primary"
            >
              Edit before saving
            </Button>
          </ControlsSeparator>
        </div>
        <WordPreview wordItem={wordItem} />
      </main>
    );
  }
}

export default SearchWordContainer;
