import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import api from "../api";
import notificationType from "../constants/notifications-type";
import loadingNames from "../constants/loading-names";
import { withLoadingNames } from "./loading-names";
import { withNotifications } from "./notifications";
import { withTokens } from "./tokens";

const WordsToLearnContext = createContext({});

class WordsToLearnProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    showNotification: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    googleToken: PropTypes.shape({})
  };

  static defaultProps = {
    googleToken: null
  };

  state = {
    wordsToLearn: [],
    count: 0
  };

  cleanWordsToLearn = () =>
    this.setState({
      wordsToLearn: [],
      count: 0
    });

  handleFetch = ({ loadingName, requestHandler, responseHandler }) => {
    const {
      showNotification,
      startLoading,
      stopLoading,
      googleToken
    } = this.props;

    return Promise.resolve(startLoading(loadingName))
      .then(() => requestHandler(googleToken) || (response => response))
      .then(responseHandler || (response => response))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingName));
  };

  fetchWordsToLearn = () =>
    this.handleFetch({
      loadingName: loadingNames.learnWord,
      requestHandler: token => api.getWordsListToLearn(token),
      responseHandler: ({ items, count }) =>
        this.setState({ wordsToLearn: items, count })
    });

  learnWord = wordId =>
    this.handleFetch({
      loadingName: loadingNames.learnWord,
      requestHandler: token => api.learnWord(wordId, token),
      responseHandler: () =>
        this.setState(prevState => ({
          wordsToLearn: [
            ...prevState.wordsToLearn.filter(word => word._id !== wordId)
          ]
        }))
    });

  relearnWord = wordId => {
    this.setState(prevState => {
      const wordToRelearn = prevState.wordsToLearn.find(
        word => word._id === wordId
      );

      return {
        wordsToLearn: [
          ...prevState.wordsToLearn.filter(
            word => word._id !== wordToRelearn._id
          ),
          wordToRelearn
        ]
      };
    });
  };

  render() {
    const { wordsToLearn, count } = this.state;
    const { children } = this.props;

    return (
      <WordsToLearnContext.Provider
        value={{
          wordsToLearn,
          countOfWordToLearn: count,
          fetchWordsToLearn: this.fetchWordsToLearn,
          learnWord: this.learnWord,
          relearnWord: this.relearnWord,
          cleanWordsToLearn: this.cleanWordsToLearn
        }}
      >
        {children}
      </WordsToLearnContext.Provider>
    );
  }
}

const WordsToLearnProvider = compose(
  withTokens,
  withLoadingNames,
  withNotifications
)(WordsToLearnProviderCmp);

const withWordsToLearn = Cmp => props => (
  <WordsToLearnContext.Consumer>
    {value => <Cmp {...value} {...props} />}
  </WordsToLearnContext.Consumer>
);

export { WordsToLearnProvider, withWordsToLearn };
