import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withWordForm } from '../../context/word-form';
import { withWords } from '../../context/words';
import { TextField, Button } from '../../mui-components';
import { ControlsSeparator } from '..';
import styles from './styles';

class Form extends Component {
  static propTypes = {
    form: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onAddNewExample: PropTypes.func.isRequired,
    onRemoveExample: PropTypes.func.isRequired,
    onResetForm: PropTypes.func.isRequired,
    onExampleChange: PropTypes.func.isRequired,
    onFormItemChange: PropTypes.func.isRequired,
    addWord: PropTypes.func.isRequired,
  };

  static defaultProps = {
    form: {},
  };

  componentWillUnmount() {
    this.props.onResetForm();
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const { form, addWord, onResetForm } = this.props;

    addWord({ ...form })
      .then(() => onResetForm())
      .catch(error => console.log(error)); // eslint-disable-line no-console
  };

  render() {
    const {
      form, onResetForm, onAddNewExample, onRemoveExample,
      onExampleChange, onFormItemChange
    } = this.props;
    const { en, ru, transcription, examples } = form;

    return (
      <form onSubmit={this.handleOnSubmit}>
        <div>
          <TextField
            label="Russian"
            value={ru}
            onChange={e => onFormItemChange(e, 'ru')}
          />
        </div>
        <div>
          <TextField
            label="English"
            value={en}
            onChange={e => onFormItemChange(e, 'en')}
          />
        </div>
        <div>
          <TextField
            label="Transcription"
            value={transcription}
            onChange={e => onFormItemChange(e, 'transcription')}
          />
        </div>
        <div>
          {examples.map(({ example, id }) => (
            <TextField
              key={id}
              label="Example"
              value={example}
              onChange={e => onExampleChange(e, id)}
              control={
                <Button onClick={() => onRemoveExample(id)}>-</Button>
              }
            />
          ))}
          <ControlsSeparator>
            <Button onClick={onAddNewExample}>
              Add an example
            </Button>
          </ControlsSeparator>
        </div>
        <ControlsSeparator
          align='right'
        >
          <Button type="submit" disabled={!Object.values(form)
            .join('')}>Save word</Button>
          {!!Object.values(form)
            .join('') && <Button onClick={onResetForm}>Reset Form</Button>}
        </ControlsSeparator>
      </form>
    );
  }
}

Form.defaultProps = {
  form: {},
};

const enhance = compose(
  injectSheet(styles),
  withWords,
  withWordForm,
);

export default enhance(Form);
