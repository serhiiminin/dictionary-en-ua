import React, { Component } from 'react';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { Form, SearchBlock } from '../index';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  form: {
    en: '',
    ru: '',
    transcription: '',
    example: '',
  },
  searchInput: '',
  foundTranslation: {
    en: '',
    ru: '',
    examples: [],
    transcription: '',
  }
};

class Sidebar extends Component {
  state = initialState;

  handleOnFormItemChange = (event, field) => {
    const { value } = event.target;

    this.setState({
      form: {
        ...this.state.form,
        [field]: value
      }
    });
  };

  handleOnFormSubmit = event => {
    event.preventDefault();
    const { form } = this.state;

    this.props.addWord({ ...form })
      .then(() => this.props.fetchWords())
      .then(() => {
        const prevFormValues = { ...form };
        const emptyFormValues = Object.assign({},
          ...Object.entries(prevFormValues)
            .map(([key]) => ({ [key]: '' }))
        );

        this.setState({ ...this.state, form: { ...emptyFormValues } });
      })
      .catch(error => console.log(error));
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

  handleTextToForm = () => {
    const { foundTranslation, } = this.state;

    this.props.addWord({ ...foundTranslation, example: foundTranslation.examples[0] })
      .then(() => this.props.fetchWords())
      .then(() => {
        const { searchInput, foundTranslation } = initialState;

        return this.setState({ searchInput, foundTranslation });
      });

  };

  render() {
    const { form, foundTranslation, searchInput } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.sidebar}>
        <Form
          form={form}
          onSubmit={this.handleOnFormSubmit}
          onChange={this.handleOnFormItemChange}
        />
        <SearchBlock
          inputValue={searchInput}
          foundTranslation={foundTranslation}
          onChange={this.handleOnSearchInputChange}
          textToForm={this.handleTextToForm}
        />
      </div>
    );
  }
}

const enhance = compose(
  injectSheet(styles)
);

export default enhance(Sidebar);
