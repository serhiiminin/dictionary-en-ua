import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Done from '@material-ui/icons/Done';
import DoneAll from '@material-ui/icons/DoneAll';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { notificationType } from '../../components/notification-item/component';
import { loadingNamesInitialState } from '../../context/loading-names';
import { loadingNamesShape } from '../../context/loading-names/shape';
import { classesDefaultProps } from '../../defaults/default-props';
import loadingNames from '../../defaults/loading-names';
import { Button } from '../../components-mui';
import { TextFieldLoading, ControlsSeparator, GuessedWordDescription } from '../../components';
import { classesShape } from '../../defaults/shapes';

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
      relearnWord(_id);
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
            <div>
              <TextFieldLoading
                loading={loading}
                onChange={this.onChangeInput}
                label='Your option'
                value={inputValue}
              />
              <h3>{currentWord && currentWord.ru}</h3>
              <ControlsSeparator align='center'>
                <Button
                  onClick={this.onCheckAnswer}
                  disabled={loading}
                  title='Submit my answer'
                  variant="fab"
                  mini
                >
                  <Done/>
                </Button>
                <Button
                  onClick={this.onGiveAHint}
                  disabled={loading}
                  title='Give me a hint'
                  variant="fab"
                  mini
                >
                  <RemoveRedEye/>
                </Button>
                <Button
                  onClick={this.onKnownWord}
                  disabled={loading}
                  title='I know this word'
                  variant="fab"
                  mini
                >
                  <DoneAll/>
                </Button>
                <Button
                  onClick={this.onForgottenWord}
                  disabled={loading}
                  title='I forgot this word, show me the translation'
                  variant="fab"
                  mini
                >
                  <ErrorOutline/>
                </Button>
              </ControlsSeparator>
            </div>
          )
        }
      </div>
    );
  }
}

export default LearnWords;
