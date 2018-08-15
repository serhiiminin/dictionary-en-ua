import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { CircularProgress, Fade } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withLoadingNames, loadingNamesInitialState } from '../../context/loading-names';
import { loadingNamesShape } from '../../context/loading-names/shape';
import { withWordForm, wordFormInitialState } from '../../context/word-form';
import { wordFormShape } from '../../context/word-form/shape';
import { withWords } from '../../context/words';
import { loadingNames } from '../../defaults';
import { classesShape } from '../../defaults/shapes';
import { TextField, Button } from '../../mui-components';
import { ControlsSeparator } from '..';
import styles from './styles';

class FormAddWord extends Component {
  static propTypes = {
    form: wordFormShape,
    currentLoadingNames: loadingNamesShape,
    onAddNewExample: PropTypes.func.isRequired,
    onRemoveExample: PropTypes.func.isRequired,
    onResetForm: PropTypes.func.isRequired,
    onExampleChange: PropTypes.func.isRequired,
    onFormItemChange: PropTypes.func.isRequired,
    saveWord: PropTypes.func.isRequired,
    classes: classesShape.isRequired,
  };

  static defaultProps = {
    form: wordFormInitialState,
    currentLoadingNames: loadingNamesInitialState,
  };

  componentWillUnmount() {
    this.props.onResetForm();
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const { form, saveWord, onResetForm } = this.props;

    saveWord({ ...form })
      .then(() => onResetForm())
      .catch(error => console.log(error)); // eslint-disable-line no-console
  };

  render() {
    const { form, onResetForm, onAddNewExample, onRemoveExample, classes,
      onExampleChange, onFormItemChange, currentLoadingNames } = this.props;
    const { en, ru, transcription, examples } = form;
    const loading = currentLoadingNames.includes(loadingNames.saveWord);

    return (
      <form
        onSubmit={this.handleOnSubmit}
        className={classes.formAdd}
      >
        <div>
          <TextField
            label="English"
            value={en}
            onChange={e => onFormItemChange(e, 'en')}
          />
          <TextField
            label="Russian"
            value={ru}
            onChange={e => onFormItemChange(e, 'ru')}
          />
          <TextField
            label="Transcription"
            value={transcription}
            onChange={e => onFormItemChange(e, 'transcription')}
          />
          <ControlsSeparator
            align='right'
          >
            <Button type="submit" disabled={!Object.values(form).join('')}>
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
      </form>
    );
  }
}

const enhance = compose(
  injectSheet(styles),
  withLoadingNames,
  withWords,
  withWordForm,
);

export default enhance(FormAddWord);
