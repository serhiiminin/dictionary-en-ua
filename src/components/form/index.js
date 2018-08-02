import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '../../mui-components';

const Form = ({ onSubmit, onReset, onChange, form = {} }) => {
  const { ru, en, transcription, example } = form;

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
        <TextField
          placeholder="Example"
          value={example}
          onChange={e => onChange(e, 'example')}
        />
      </div>
      <Button type="submit" disabled={!Object.values(form).join('')}>Add word</Button>
      {!!Object.values(form).join('') && <Button onClick={onReset}>Reset Form</Button>}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Form.defaultProps = {
  form: {},
};

export default Form;
