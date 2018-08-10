import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { CircularProgress, Fade } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withLoadingNames } from '../../context/loading-names';
import { withNotifications } from '../../context/notifications';
import { withWordForm } from '../../context/word-form';
import { withWords } from '../../context/words';
import { loadingNames } from '../../defaults';
import { TextField, Button } from '../../mui-components';
import { ControlsSeparator } from '..';
import { notificationType } from '../notifications';
import styles from './styles';

class FormAddWord extends Component {
  static propTypes = {
    form: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    currentLoadingNames: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line react/forbid-prop-types
    onAddNewExample: PropTypes.func.isRequired,
    onRemoveExample: PropTypes.func.isRequired,
    onResetForm: PropTypes.func.isRequired,
    onExampleChange: PropTypes.func.isRequired,
    onFormItemChange: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    saveWord: PropTypes.func.isRequired,
  };

  static defaultProps = {
    form: {},
    currentLoadingNames: [],
  };

  componentWillUnmount() {
    this.props.onResetForm();
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const { form, saveWord, onResetForm, showNotification } = this.props;

    saveWord({ ...form })
      .then(() => showNotification('The word has been added successfully', notificationType.success))
      .then(() => onResetForm())
      .catch(error => console.log(error)); // eslint-disable-line no-console
  };

  render() {
    const {
      form, onResetForm, onAddNewExample, onRemoveExample,
      onExampleChange, onFormItemChange, currentLoadingNames
    } = this.props;
    const { en, ru, transcription, examples } = form;
    const loading = currentLoadingNames.includes(loadingNames.saveWord);

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
          {examples && examples.map(({ example, id }) => (
            <TextField
              key={id}
              label="Example"
              value={example}
              onChange={e => onExampleChange(e, id)}
              control={
                <Button onClick={() => onRemoveExample(id)}>
                  <DeleteIcon/>
                </Button>
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
            .join('')}>
            <Fade
              in={loading}
              style={{ transitionDelay: loading ? '300ms' : '' }}
              unmountOnExit
            >
              <CircularProgress
                color="inherit"
                size={16}
              />
            </Fade>
            Save word
          </Button>
          {!!Object.values(form)
            .join('') && <Button onClick={onResetForm}>Reset Form</Button>}
        </ControlsSeparator>
      </form>
    );
  }
}

FormAddWord.defaultProps = {
  form: {},
};

const enhance = compose(
  injectSheet(styles),
  withNotifications,
  withLoadingNames,
  withWords,
  withWordForm,
);

export default enhance(FormAddWord);
