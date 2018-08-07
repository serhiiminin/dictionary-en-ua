import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withWords } from '../../context/words';
import { Form, SearchBlock } from '../index';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  form: {
    en: '',
    ru: '',
    transcription: '',
    examples: [],
  },
  searchInput: '',
  foundTranslation: {
    en: '',
    ru: '',
    transcription: '',
    examples: [],
  }
};

class Sidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    addWord: PropTypes.func.isRequired,
    searchWord: PropTypes.func.isRequired,
  };

  state = initialState;

  handleOnFormItemChange = (event, field) => {
    const { value } = event.target;

    this.setState(prevState => ({ form: { ...prevState.form, [field]: value } }));
  };

  handleOnFormReset = () => {
    this.setState(prevState => ({
      ...prevState,
      form: { ...initialState.form }
    }));
  };

  handleResetSearchData = () => {
    this.setState(prevState => ({
      ...prevState,
      foundTranslation: { ...initialState.foundTranslation },
      searchInput: initialState.searchInput,
    }));
  };

  handleOnFormSubmit = event => {
    event.preventDefault();
    const { form } = this.state;

    this.props.addWord({ ...form })
      .then(() => this.handleOnFormReset())
      .catch(error => console.log(error)); // eslint-disable-line no-console
  };

  handleOnSearchInputChange = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;
    const from = encodeURIComponent(value) === value ? 'en' : 'ru';
    const to = encodeURIComponent(value) === value ? 'ru' : 'en';

    this.setState({ searchInput: value });
    if (!value) {
      const { searchInput, foundTranslation } = initialState;

      this.setState({ searchInput, foundTranslation });
      return;
    }
    this.inputTimer = setTimeout(() => {
      this.props.searchWord({ text: value, from, to })
        .then(response => {
          const { ru, en, transcription, results } = response;
          const examplesList = results && results
            .reduce((res, val) =>
                val.examples
                  ? [...res, ...val.examples]
                  : [...res],
              []);

          this.setState({
            foundTranslation: { en, ru, transcription, examples: examplesList || [], }
          });
        });
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleEditBeforeSaving = () => {
    const { foundTranslation } = this.state;
    const { en, ru, transcription, examples } = foundTranslation;

    this.setState({
      ...initialState,
      form: { en, ru, transcription, examples },
    });
  };

  handleAddWordToList = () =>
    this.props.addWord({ ...this.state.foundTranslation })
      .then(() => this.handleResetSearchData());

  render() {
    const { form, foundTranslation, searchInput } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.sidebar}>
        <Form
          form={form}
          onSubmit={this.handleOnFormSubmit}
          onChange={this.handleOnFormItemChange}
          onReset={this.handleOnFormReset}
        />
        <SearchBlock
          inputValue={searchInput}
          foundTranslation={foundTranslation}
          onChange={this.handleOnSearchInputChange}
          editBeforeSaving={this.handleEditBeforeSaving}
          addWordToList={this.handleAddWordToList}
        />
      </div>
    );
  }
}

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(Sidebar);
