import React from 'react';
import { TextField, Button } from '../../mui-components';

const Form = ({ onSubmit, onChange, form }) => {
  const { ru, en, transcription, example} = form;

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
      <Button type="submit">Add word</Button>
    </form>
  );
};

export default Form;
