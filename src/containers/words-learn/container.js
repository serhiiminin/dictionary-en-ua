import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components-mui';
import { notificationType } from '../../components/notification-item/component';
import loadingNames from '../../constants/loading-names';
import { WordPreview, LearningBoard } from '../../components';

class LearnWordsContainer extends Component {
  static propTypes = {
    fetchWordsToLearn: PropTypes.func.isRequired,
    cleanWordsToLearn: PropTypes.func.isRequired,
    learnWord: PropTypes.func.isRequired,
    relearnWord: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string),
    checkIsLoading: PropTypes.func.isRequired,
  };

  static defaultProps = {
    classes: {},
  };

  state = {
    countOfTry: 0,
    guessed: false,
    inputValue: '',
    currentWord: {}
  };

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    ...prevState,
    currentWord: nextProps.wordsToLearn[0],
  });

  componentDidMount() {
    this.props.fetchWordsToLearn();
  }

  componentWillUnmount() {
    this.props.cleanWordsToLearn();
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
      this.setState({
        inputValue: en.slice(0, inputValueLength + 1),
      });
      return null;
    }
    return this.setState({
      inputValue: en.slice(0, inputValueLength),
    });
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
    const { checkIsLoading, classes } = this.props;
    const loading = checkIsLoading(loadingNames.learnWord);
    const { currentWord, inputValue, guessed } = this.state;

    return guessed
      ? (
        <Fragment>
          <Button
            onClick={this.onLearnNextWord}
            variant='contained'
            color='primary'
          >
            Learn the next word
          </Button>
          <WordPreview
            word={currentWord}
          />
        </Fragment>
      )
      : (
        <div className={classes.learnWord}>
          <LearningBoard
            loading={loading}
            onOptionChange={this.onChangeInput}
            inputValue={inputValue}
            word={currentWord && currentWord.ua}
            timesLearnt={currentWord && currentWord.timesLearnt}
            onCheckAnswer={this.onCheckAnswer}
            onGiveAHint={this.onGiveAHint}
            onKnownWord={this.onKnownWord}
            onForgottenWord={this.onForgottenWord}
          />
        </div>
      );
  }
}

export default LearnWordsContainer;
