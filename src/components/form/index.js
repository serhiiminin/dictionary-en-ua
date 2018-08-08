import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withWords } from '../../context/words';
import { TextField, Button } from '../../mui-components';
import styles from './styles';

const Form = ({ classes, onSubmit, onChange, onReset, form, addNewExample, onChangeExample, removeExample }) => {
  const { en, ru, transcription, examples } = form;

  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField
          placeholder="Russian"
          value={ru}
          onChange={e => onChange(e, 'ru')}
        />
      </div>
      <div>
        <TextField
          placeholder="English"
          value={en}
          onChange={e => onChange(e, 'en')}
        />
      </div>
      <div>
        <TextField
          placeholder="Transcription"
          value={transcription}
          onChange={e => onChange(e, 'transcription')}
        />
      </div>
      <div>
        {examples.map(({ example, id }) => (
          <TextField
            key={id}
            placeholder="Example"
            value={example}
            onChange={e => onChangeExample(e, id)}
            control={
              <Button onClick={() => removeExample(id)}>-</Button>
            }
          />
        ))}
        <div className={classes.addExample}>
          <Button onClick={addNewExample}>
            Add example
          </Button>
        </div>
      </div>
      <Button type="submit" disabled={!Object.values(form)
        .join('')}>Save word</Button>
      {!!Object.values(form)
        .join('') && <Button onClick={onReset}>Reset Form</Button>}
    </form>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  addNewExample: PropTypes.func.isRequired,
  removeExample: PropTypes.func.isRequired,
  onChangeExample: PropTypes.func.isRequired,
  form: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Form.defaultProps = {
  form: {},
};

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(Form);
