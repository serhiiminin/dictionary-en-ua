import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { apiWords, apiGifs } from "../api";
import notificationType from "../constants/notifications-type";
import loadingNames from "../constants/loading-names";
import { parseSearchParams } from "../helpers/join-url";
import { normalizeWord } from "../helpers/word-utils";
import { withLoadingNames } from "./loading-names";
import { withNotifications } from "./notifications";
import { withUser } from "./user";
import routes from "../routes";

const WordsContext = createContext({});

const INITIAL_WORD_SORT_DATA = {
  sortBy: "dateCreated",
  sortDirection: "descend",
  page: 1,
  countPerPage: 5
};

const wordsInitialState = {
  wordsList: [],
  word: {},
  count: 0,
  gif: ""
};
class WordsProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    showNotification: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    googleToken: PropTypes.shape({})
  };

  static defaultProps = {
    googleToken: null
  };

  state = wordsInitialState;

  getSearchParams = () => {
    const { location } = this.props;
    const { sortBy, sortDirection, page, countPerPage } = INITIAL_WORD_SORT_DATA;
    const parsedParams = parseSearchParams(location.search);

    return {
      sortBy: parsedParams.sortBy || sortBy,
      sortDirection: parsedParams.sortDirection || sortDirection,
      page: Number(parsedParams.page) || page,
      countPerPage: Number(parsedParams.countPerPage) || countPerPage
    };
  };

  cleanWordsList = () => this.setState({ wordsList: wordsInitialState.wordsList });

  cleanWord = () => this.setState({ word: wordsInitialState.word });

  setWordToState = word => this.setState({ word });

  handleFetch = ({ loadingName, requestHandler, responseHandler }) => {
    const { showNotification, startLoading, stopLoading, googleToken, history } = this.props;

    return Promise.resolve(startLoading(loadingName))
      .then(() => requestHandler(googleToken))
      .then(responseHandler)
      .catch(err => {
        if (err.message === "Unauthorized") {
          history.push(routes.login);
          return showNotification("You are not authorized! Please, use your google account", notificationType.info);
        }
        return showNotification(err.message, notificationType.error);
      })
      .finally(() => stopLoading(loadingName));
  };

  fetchWord = wordId =>
    this.handleFetch({
      loadingName: loadingNames.words.fetch,
      requestHandler: token => apiWords.get(wordId, token),
      responseHandler: word => this.setState({ word })
    });

  fetchWordsList = () => {
    const { location } = this.props;
    const { sortBy, sortDirection, page, countPerPage } = this.getSearchParams(location.search);
    const query = {
      skip: (page - 1) * countPerPage,
      limit: Number(countPerPage),
      sortDirection: sortDirection === "descend" ? -1 : 1,
      sortBy
    };

    return this.handleFetch({
      loadingName: loadingNames.words.list,
      requestHandler: token => apiWords.getList({ query, googleId: token && token.googleId }, token),
      responseHandler: ({ items, count }) => this.setState({ wordsList: items, count })
    });
  };

  createWord = word =>
    this.handleFetch({
      loadingName: loadingNames.words.save,

      requestHandler: tokenData =>
        apiWords.create(
          {
            ...word,
            googleId: tokenData && tokenData.googleId
          },
          tokenData
        ),
      responseHandler: () =>
        this.props.showNotification("The word has been saved successfully", notificationType.success)
    });

  editWord = word =>
    this.handleFetch({
      loadingName: loadingNames.words.fetch,
      requestHandler: token => apiWords.update(word, token),
      responseHandler: () =>
        this.props.showNotification("The word has been updated successfully", notificationType.success)
    });

  deleteWord = id =>
    this.handleFetch({
      loadingName: loadingNames.words.delete,
      requestHandler: token => apiWords.delete(id, token),
      responseHandler: () => this.fetchWordsList()
    }).then(() => this.props.showNotification("The word has been deleted successfully", notificationType.success));

  searchWord = params =>
    this.handleFetch({
      loadingName: loadingNames.words.search,
      requestHandler: token => apiWords.search(params, token),
      responseHandler: foundWord =>
        apiGifs.get({ q: foundWord.en }).then(gifs => {
          const downsizedGifs = gifs && gifs.data && gifs.data.map(gif => gif.images.downsized_large.url);
          const randomGif = downsizedGifs && downsizedGifs[Math.round(Math.random() * downsizedGifs.length)];

          this.setState({
            word: {
              ...normalizeWord(foundWord),
              gif: randomGif
            }
          });
        })
    });

  fetchWordsToLearn = () =>
    this.handleFetch({
      loadingName: loadingNames.words.learn,
      requestHandler: token => apiWords.getListToLearn({ googleId: token && token.googleId }, token),
      responseHandler: ({ items, count }) => this.setState({ wordsList: items, count })
    });

  learnWord = wordId =>
    this.handleFetch({
      loadingName: loadingNames.words.learn,
      requestHandler: token => apiWords.learn(wordId, token),
      responseHandler: () =>
        this.setState(prevState => ({
          wordsList: [...prevState.wordsList.filter(word => word._id !== wordId)]
        }))
    });

  relearnWord = wordId => {
    this.setState(prevState => {
      const wordToRelearn = prevState.wordsList.find(word => word._id === wordId);

      return {
        wordsList: [...prevState.wordsList.filter(word => word._id !== wordToRelearn._id), wordToRelearn]
      };
    });
  };

  render() {
    const { wordsList, word, count, gif } = this.state;
    const { children } = this.props;

    return (
      <WordsContext.Provider
        value={{
          gif,
          word,
          wordsList,
          wordsCount: count,
          getWordsSearchParams: this.getSearchParams,
          setWordToState: this.setWordToState,
          cleanWord: this.cleanWord,
          cleanWordsList: this.cleanWordsList,
          fetchWord: this.fetchWord,
          fetchWordsList: this.fetchWordsList,
          fetchWordsToLearn: this.fetchWordsToLearn,
          editWord: this.editWord,
          deleteWord: this.deleteWord,
          learnWord: this.learnWord,
          relearnWord: this.relearnWord,
          saveWord: this.createWord,
          searchWord: this.searchWord
        }}>
        {children}
      </WordsContext.Provider>
    );
  }
}

const WordsProvider = compose(
  withRouter,
  withUser,
  withLoadingNames,
  withNotifications
)(WordsProviderCmp);

const withWords = Cmp => props => (
  <WordsContext.Consumer>{value => <Cmp {...value} {...props} />}</WordsContext.Consumer>
);

export { WordsProvider, withWords };
