import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const FormField = ({ form, initialValues, component, onChange, validate, ...props }) => {
  const Cmp = component || TextField;
  const [isInvalid, setValidation] = useState(false);

  const validateValue = event => {
    const isInv = !validate.map(validator => validator(event.target.value)).includes(true);
    setValidation(isInv);

    onChange(event);
  };

  return <Cmp value={form[props.name]} onChange={validateValue} error={isInvalid} {...props} />;
};

FormField.propTypes = {
  validate: PropTypes.arrayOf(PropTypes.func),
  component: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  form: PropTypes.instanceOf(Object),
  initialValues: PropTypes.instanceOf(Object),
};

FormField.defaultProps = {
  form: {},
  validate: [],
  initialValues: {},
  component: null,
};

export default FormField;
