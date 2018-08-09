import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import uuid from 'uuid';
import { ButtonWithRouter, Form, SearchBlock, ControlsSeparator } from '../../components';
import { withWords } from '../../context/words';
import routes from '../../routes';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  form: {
    en: '',
    ru: '',
    transcription: '',
    examples: [],
  },
  searchValue: '',
};

class AddWord extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    foundWord: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    addWord: PropTypes.func.isRequired,
    searchWord: PropTypes.func.isRequired,
    cleanFoundWord: PropTypes.func.isRequired,
  };

  state = initialState;

  handleOnFormSubmit = event => {
    event.preventDefault();
    const { form } = this.state;

    this.props.addWord({ ...form })
      .then(() => this.handleOnFormReset())
      .catch(error => console.log(error)); // eslint-disable-line no-console
  };

  handleOnFormItemChange = (event, field) => {
    const { value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [field]: value
      }
    }));
  };

  handleOnFormReset = () =>
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...initialState.form
      }
    }));

  handleOnChangeSearchInput = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;
    const from = encodeURIComponent(value) === value ? 'en' : 'ru';
    const to = encodeURIComponent(value) === value ? 'ru' : 'en';

    this.setState({ searchValue: value });

    if (!value) {
      const { searchValue } = initialState;

      this.setState({ searchValue });
      return;
    }
    this.inputTimer = setTimeout(() => {
      this.props.searchWord({ text: value, from, to });
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleEditBeforeSaving = () => {
    const { foundWord } = this.props;
    const { en, ru, transcription, examples } = foundWord;

    this.setState({
      ...initialState,
      form: { en, ru, transcription, examples },
    });
  };

  handleAddWordToList = () =>
    this.props.addWord({
      ...this.props.foundWord,
    })
      .then(this.props.cleanFoundWord());

  handleAddNewExample = () =>
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        examples: [
          ...prevState.form.examples,
          {
            id: uuid(),
            example: ''
          }
        ]
      }
    }));

  handleOnExampleChange = (event, currentId) => {
    const { value } = event.target;

    this.setState(prevState => {
      const updatedExamples = [...prevState.form.examples]
        .map(item => item.id === currentId ? ({ ...item, example: value, }) : item);

      return ({
        ...prevState,
        form: {
          ...prevState.form,
          examples: updatedExamples,
        }
      });
    });
  };

  handleRemoveExample = id =>
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        examples: [...prevState.form.examples].filter(example => example.id !== id),
      }
    }));

  render() {
    const { classes } = this.props;
    const { form, searchValue } = this.state;

    return (
      <Fragment>
        <ControlsSeparator>
          <ButtonWithRouter to={routes.myWords}>List of my words</ButtonWithRouter>
        </ControlsSeparator>
        <main className={classes.addWord}>
          <Form
            form={form}
            onSubmit={this.handleOnFormSubmit}
            onChange={this.handleOnFormItemChange}
            onReset={this.handleOnFormReset}
            onChangeExample={this.handleOnExampleChange}
            addNewExample={this.handleAddNewExample}
            removeExample={this.handleRemoveExample}
          />
          <SearchBlock
            searchValue={searchValue}
            onChange={this.handleOnChangeSearchInput}
            addWord={this.handleAddWordToList}
            editWordBeforeSaving={this.handleEditBeforeSaving}
          />
        </main>
      </Fragment>
    );
  }
}

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(AddWord);
