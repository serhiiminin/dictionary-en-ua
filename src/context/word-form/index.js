import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const WordFormContext = createContext({});

const wordFormInitialState = {
  form: {
    en: '',
    ua: '',
    transcription: '',
    examples: [],
  }
};

class WordFormProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = wordFormInitialState;

  handleFillForm = form =>
    Promise.resolve(this.setState({ form: { ...form } }));

  handleOnFormItemChange = (event, field) => {
    const { value } = event.target;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [field]: value
      }
    }));
  };

  handleOnExampleChange = (event, currentId) => {
    const { value } = event.target;

    this.setState(prevState => {
      const updatedExamples = [...prevState.form.examples]
        .map(item => item.id === currentId ? ({ ...item, example: value, }) : item);

      return ({
        form: {
          ...prevState.form,
          examples: updatedExamples,
        }
      });
    });
  };

  handleAddNewExample = () =>
    this.setState(prevState => ({
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

  handleRemoveExample = id =>
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        examples: [...prevState.form.examples].filter(example => example.id !== id),
      }
    }));

  handleOnFormReset = () =>
    this.setState({
      form: { ...wordFormInitialState.form }
    });

  render() {
    const { form } = this.state;
    const { children } = this.props;

    return (
      <WordFormContext.Provider
        value={{
          form,
          onFillForm: this.handleFillForm,
          onFormItemChange: this.handleOnFormItemChange,
          onExampleChange: this.handleOnExampleChange,
          onAddNewExample: this.handleAddNewExample,
          onRemoveExample: this.handleRemoveExample,
          onResetForm: this.handleOnFormReset,
        }}
      >{children}</WordFormContext.Provider>
    );
  }
}

const withWordForm = Cmp => props =>
  <WordFormContext.Consumer>{value => <Cmp {...value} {...props} />}</WordFormContext.Consumer>;

export { WordFormProvider, withWordForm, wordFormInitialState };
