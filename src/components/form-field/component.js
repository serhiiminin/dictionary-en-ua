import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const FormField = ({ name, form, initialValues, component, validate, onChange, errors, fieldsErrors, ...props }) => {
  const Cmp = component || TextField;
  const { isError, values } = errors[name];

  const handleOnChange = event => {
    const isInvalid = validate.map(validator => Boolean(validator(form[name]))).includes(false);
    const err = isInvalid ? ['not empty'] : [];

    onChange(event, { isError: isInvalid, values: err });
  };

  return (
    <Cmp name={name} value={form[name]} onChange={handleOnChange} helperText={values[0]} error={isError} {...props} />
  );
};

FormField.propTypes = {
  validate: PropTypes.arrayOf(PropTypes.func),
  errors: PropTypes.objectOf(
    PropTypes.shape({
      isError: PropTypes.bool,
      values: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  fieldsErrors: PropTypes.objectOf(
    PropTypes.shape({
      isError: PropTypes.bool,
      values: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
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
