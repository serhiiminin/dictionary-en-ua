import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Done from '@material-ui/icons/Done';
import DoneAll from '@material-ui/icons/DoneAll';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { notificationType } from '../../components/notification-item/component';
import { loadingNamesInitialState } from '../../context/loading-names';
import { loadingNamesShape } from '../../context/loading-names/shape';
import loadingNames from '../../defaults/loading-names';
import { Button } from '../../components-mui';
import { TextFieldLoading } from '../../components';

class LearnWords extends Component {
  static propTypes = {
    fetchWordsToLearn: PropTypes.func.isRequired,
    cleanWords: PropTypes.func.isRequired,
    learnWord: PropTypes.func.isRequired,
    relearnWord: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    currentLoadingNames: loadingNamesShape,
  };

  static defaultProps = {
    currentLoadingNames: loadingNamesInitialState,
  };

  state = {
    countOfTry: 0,
    guessed: false,
    inputValue: '',
    currentWord: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      currentWord: nextProps.words[0],
    };
  }

  componentDidMount() {
    this.props.fetchWordsToLearn();
  }

  componentWillUnmount() {
    this.props.cleanWords();
  }

  onChangeInput = event => {
    const { value } = event.target;

    this.setState({ inputValue: value });
  };

  resetCountOfTry = () =>
    this.setState(prevState => ({
      ...prevState,
      countOfTry: 0,
    }));

  onCheckAnswer = () => {
    const { showNotification, relearnWord, learnWord } = this.props;
    const { inputValue, currentWord, countOfTry } = this.state;
    const { en, _id } = currentWord;

    if (inputValue.toLowerCase() === en.toLowerCase()) {
      this.resetCountOfTry();
      this.setState({ inputValue: '' });
      return learnWord(_id)
        .then(() => showNotification('You are right!', notificationType.success));
    }
    if (countOfTry <= 2) {
      this.setState(prevState => ({
        ...prevState,
        countOfTry: prevState.countOfTry + 1,
      }), () => {
        showNotification(`You are wrong! ${3-this.state.countOfTry} attempts left`, notificationType.warning);
      });
    }
    if (countOfTry > 2) {
      this.resetCountOfTry();
      relearnWord(_id)
    }
    return false;
  };

  onGiveAHint = () => {
    const { inputValue, currentWord } = this.state;
    const { en } = currentWord;
    const inputValueLength = inputValue.length;

    if(inputValueLength < en.length) {
      this.setState(prevState => ({
        ...prevState,
        inputValue: en.slice(0, inputValueLength+1),
      }));
      return false;
    }
    return this.setState(prevState => ({
      ...prevState,
      inputValue: en.slice(0, inputValueLength),
    }))
  };

  render() {
    const { currentLoadingNames, showNotification } = this.props;
    const loading = currentLoadingNames.includes(loadingNames.learnWord);
    const { currentWord, inputValue } = this.state;

    return (
      <div>
        <h3>{currentWord && currentWord.ru}</h3>
        <TextFieldLoading
          loading={loading}
          onChange={this.onChangeInput}
          label='Your option'
          value={inputValue}
        />
        <div>
          <div>
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
          </div>
          <div>
            <Button
              onClick={() => showNotification('Wrong! 2 attempts left', notificationType.info)}
              disabled={loading}
              title='I know this word'
              variant="fab"
              mini
            >
              <DoneAll/>
            </Button>
            <Button
              disabled={loading}
              title='I forgot this word, show me the translation'
              variant="fab"
              mini
            >
              <ErrorOutline/>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LearnWords;
