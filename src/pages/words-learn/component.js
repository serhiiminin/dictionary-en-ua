import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notificationType } from '../../components/notification-item/component';
import { loadingNamesInitialState } from '../../context/loading-names';
import { loadingNamesShape } from '../../context/loading-names/shape';
import { classesDefaultProps } from '../../constants/default-props';
import loadingNames from '../../constants/loading-names';
import { GuessedWordDescription, LearningBoard } from '../../components';
import { classesShape } from '../../constants/shapes';

class LearnWords extends Component {
  static propTypes = {
    fetchWordsToLearn: PropTypes.func.isRequired,
    cleanWords: PropTypes.func.isRequired,
    learnWord: PropTypes.func.isRequired,
    relearnWord: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    currentLoadingNames: loadingNamesShape,
    classes: classesShape,
  };

  static defaultProps = {
    currentLoadingNames: loadingNamesInitialState,
    classes: classesDefaultProps,
  };

  state = {
    countOfTry: 0,
    guessed: false,
    inputValue: '',
    currentWord: {}
  };

  static getDerivedStateFromProps = (nextProps, prevState) => ({
      ...prevState,
      currentWord: nextProps.words[0],
    });

  componentDidMount() {
    this.props.fetchWordsToLearn();
  }

  componentWillUnmount() {
    this.props.cleanWords();
  }

  onChangeInput = event => this.setState({ inputValue: event.target.value });

  resetCountOfTry = () => this.setState({ countOfTry: 0 });

  onCheckAnswer = () => {
    const { showNotification, relearnWord } = this.props;
    const { inputValue, currentWord, countOfTry } = this.state;

    if (!currentWord) return null;
    const { en, _id } = currentWord;

    if (inputValue.toLowerCase() === en.toLowerCase()) {
      this.resetCountOfTry();
      this.setState({
        guessed: true,
        inputValue: '',
      });
      return showNotification('You are right!', notificationType.info);
    }
    if (countOfTry <= 2) {
      this.setState(prevState => ({
        ...prevState,
        countOfTry: prevState.countOfTry + 1,
      }), () => {
        const attemptLeft = 4 - this.state.countOfTry;

        showNotification(`You are wrong! ${attemptLeft} attempt${attemptLeft > 1 ? 's' : ''} left`, notificationType.info);
      });
    }
    if (countOfTry > 2) {
      this.resetCountOfTry();
      showNotification(`You don't remember this word. Keep learning it!`, notificationType.warning);
      return relearnWord(_id);
    }
    return false;
  };

  onGiveAHint = () => {
    const { inputValue, currentWord } = this.state;

    if (!currentWord) return null;
    const { en } = currentWord;
    const inputValueLength = inputValue.length;

    if (inputValueLength < en.length) {
      this.setState(prevState => ({
        ...prevState,
        inputValue: en.slice(0, inputValueLength + 1),
      }));
      return null;
    }
    return this.setState(prevState => ({
      ...prevState,
      inputValue: en.slice(0, inputValueLength),
    }));
  };

  onKnownWord = () => this.props.learnWord(this.state.currentWord._id);

  onForgottenWord = () => this.props.relearnWord(this.state.currentWord._id);

  onLearnNextWord = () =>
    this.props.learnWord(this.state.currentWord._id)
      .then(() => this.setState({
        countOfTry: 0,
        guessed: false,
      }));

  render() {
    const { currentLoadingNames, classes } = this.props;
    const loading = currentLoadingNames.includes(loadingNames.learnWord);
    const { currentWord, inputValue, guessed } = this.state;

    return (
      <div className={classes.learnWord}>
        {guessed
          ? (
            <GuessedWordDescription
              word={currentWord}
              onLearnNextWord={this.onLearnNextWord}
            />
          )
          : (
            <LearningBoard
              loading={loading}
              onOptionChange={this.onChangeInput}
              inputValue={inputValue}
              word={currentWord && currentWord.ru}
              timesLearnt={currentWord && currentWord.timesLearnt}
              onCheckAnswer={this.onCheckAnswer}
              onGiveAHint={this.onGiveAHint}
              onKnownWord={this.onKnownWord}
              onForgottenWord={this.onForgottenWord}
            />
          )
        }
      </div>
    );
  }
}

export default LearnWords;
