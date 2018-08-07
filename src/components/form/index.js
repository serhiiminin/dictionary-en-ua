import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withWords } from '../../context/words';
import { TextField, Button } from '../../mui-components';

const initialState = {
  form: {
    en: '',
    ru: '',
    transcription: '',
    examples: [],
  },
};

class Form extends Component {
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

    this.setState(prevState => ({ form: { ...prevState.form, [field]: value } }));
  };

  handleOnFormReset = () => {
    this.setState(prevState => ({
      ...prevState,
      form: { ...initialState.form }
    }));
  };

  render() {
    const { form } = this.state;
    const { ru, en, transcription, example } = form;

    return (
      <form onSubmit={this.handleOnFormSubmit}>
        <div>
          <TextField
            placeholder="Russian"
            value={ru}
            onChange={e => this.handleOnFormItemChange(e, 'ru')}
          />
        </div>
        <div>
          <TextField
            placeholder="English"
            value={en}
            onChange={e => this.handleOnFormItemChange(e, 'en')}
          />
        </div>
        <div>
          <TextField
            placeholder="Transcription"
            value={transcription}
            onChange={e => this.handleOnFormItemChange(e, 'transcription')}
          />
        </div>
        <div>
          <TextField
            placeholder="Example"
            value={example}
            onChange={e => this.handleOnFormItemChange(e, 'example')}
          />
        </div>
        <Button type="submit" disabled={!Object.values(form).join('')}>Add word</Button>
        {!!Object.values(form).join('') && <Button onClick={this.handleOnFormReset}>Reset Form</Button>}
      </form>
    )
  }
}

Form.propTypes = {
  addWord: PropTypes.func.isRequired,
};

const enhance = compose(
  withWords,
);

export default enhance(Form);
