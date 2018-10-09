import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Fade } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import loadingNames from '../../constants/loading-names';
import { Button, TextField } from '../../components-mui';
import { ControlsSeparator } from '..';

class FormAddWord extends Component {
  static propTypes = {
    form: PropTypes.shape({
      en: PropTypes.string,
    }),
    checkIsLoading: PropTypes.func.isRequired,
    onAddNewExample: PropTypes.func.isRequired,
    onRemoveExample: PropTypes.func.isRequired,
    onResetForm: PropTypes.func.isRequired,
    onExampleChange: PropTypes.func.isRequired,
    onFormItemChange: PropTypes.func.isRequired,
    saveWord: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    form: {},
    classes: {},
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
      onExampleChange, onFormItemChange, checkIsLoading } = this.props;
    const { en, ua, transcription, examples } = form;
    const loading = checkIsLoading(loadingNames.saveWord);

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
            label="Ukrainian"
            value={ua}
            onChange={e => onFormItemChange(e, 'ua')}
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
                <Button
                  onClick={() => onRemoveExample(id)}
                  title='Remove example'
                  variant="fab"
                  mini
                >
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

export default FormAddWord;
