import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { ButtonWithRouter, Form, SearchBlock } from '../../components';
import { withWords } from '../../context/words';
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

  handleOnFormReset = () => {
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...initialState.form
      }
    }));
  };

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

  render() {
    const { classes } = this.props;
    const { form, searchValue } = this.state;

    return (
      <React.Fragment>
        <ButtonWithRouter to='my-words'>List of words</ButtonWithRouter>
        <main className={classes.addWord}>
          <Form
            form={form}
            onSubmit={this.handleOnFormSubmit}
            onChange={this.handleOnFormItemChange}
            onReset={this.handleOnFormItemChange}
          />
          <SearchBlock
            searchValue={searchValue}
            onChange={this.handleOnChangeSearchInput}
            addWord={this.handleAddWordToList}
            editWordBeforeSaving={this.handleEditBeforeSaving}
          />
        </main>
      </React.Fragment>
    );
  }
}

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(AddWord);
