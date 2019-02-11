import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import notificationType from '../../constants/notifications-type';
import loadingNames from '../../constants/loading-names';
import { WordPreview, LearningBoard, Button } from '../../components';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const MAX_COUNT_ATTEMPTS = 3;

const getIndexOfDiscrepancy = originString => stringToCompare =>
  originString
    .split('')
    .findIndex((letter, index) => letter !== stringToCompare[index]);

class LearnWordsContainer extends Component {
  static propTypes = {
    fetchWordsToLearn: PropTypes.func.isRequired,
    cleanWordsList: PropTypes.func.isRequired,
    learnWord: PropTypes.func.isRequired,
    relearnWord: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  static defaultProps = {
    classes: {},
  };

  state = {
    countOfTry: 0,
    guessed: false,
    inputValue: '',
    currentWord: {},
  };

  static getDerivedStateFromProps = (nextProps, prevState) =>
    nextProps.wordsList && nextProps.wordsList.length > 0
      ? {
          ...prevState,
          currentWord: nextProps.wordsList[0],
        }
      : prevState;

  componentDidMount() {
    this.props.fetchWordsToLearn();
  }

  componentWillUnmount() {
    this.props.cleanWordsList();
  }

  onChangeInput = event => this.setState({ inputValue: event.target.value });

  resetCountOfTry = () => this.setState({ countOfTry: 0 });

  onCheckAnswer = () => {
    const { enqueueSnackbar, relearnWord } = this.props;
    const { inputValue, currentWord } = this.state;

    if (currentWord && Object.keys(currentWord).length > 0) {
      const { en, _id } = currentWord;
      if (inputValue.toLowerCase() === en.toLowerCase()) {
        this.setState({
          guessed: true,
          inputValue: '',
          countOfTry: 0,
        });
        enqueueSnackbar('You are right!', { variant: notificationType.info });
      }

      this.setState(
        prevState => ({
          countOfTry: prevState.countOfTry + 1,
        }),
        () => {
          const { countOfTry } = this.state;
          if (countOfTry < MAX_COUNT_ATTEMPTS) {
            const attemptsLeft = MAX_COUNT_ATTEMPTS - this.state.countOfTry;
            enqueueSnackbar(
              `You are wrong! ${attemptsLeft} attempt${
                attemptsLeft > 1 ? 's' : ''
              } left`,
              { variant: notificationType.info }
            );
          } else {
            this.setState({ countOfTry: 0 });
            enqueueSnackbar(`You don't remember this word. Keep learning it!`, {
              variant: notificationType.warning,
            });
            relearnWord(_id);
          }
        }
      );
    }
  };

  onGiveAHint = () => {
    const { inputValue, currentWord } = this.state;

    if (currentWord && Object.keys(currentWord).length > 0) {
      const { en } = currentWord;
      const discrepancyIndex = getIndexOfDiscrepancy(en)(inputValue);
      const countOfHintsLetter =
        discrepancyIndex >= 0 ? discrepancyIndex : en.length - 1;

      this.setState({
        inputValue: en.slice(
          0,
          countOfHintsLetter < en.length
            ? countOfHintsLetter + 1
            : countOfHintsLetter
        ),
      });
    }
  };

  onKnownWord = () => this.props.learnWord(this.state.currentWord._id);

  onForgottenWord = () => this.props.relearnWord(this.state.currentWord._id);

  onLearnNextWord = () =>
    this.props.learnWord(this.state.currentWord._id).then(() =>
      this.setState({
        countOfTry: 0,
        guessed: false,
      })
    );

  render() {
    const { checkIsLoading, classes } = this.props;
    const { currentWord, inputValue, guessed } = this.state;
    const loading = checkIsLoading(loadingNames.words.learn);

    return guessed ? (
      <Fragment>
        <Button
          onClick={this.onLearnNextWord}
          variant="contained"
          color="primary"
        >
          Learn the next word
        </Button>
        <WordPreview wordItem={currentWord} />
      </Fragment>
    ) : (
      <div className={classes.learnWord}>
        <LearningBoard
          loading={loading}
          onOptionChange={this.onChangeInput}
          inputValue={inputValue}
          word={currentWord && currentWord.word}
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
