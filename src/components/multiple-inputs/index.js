import React from 'react';
import { TextField } from '../../components-mui';

const MultipleInputs = ({ inputs }) =>
  inputs.map(({ id, value }) => (
    <TextField
      key={id}
      label="English"
      value={value}
    />
  ));

export default MultipleInputs;
