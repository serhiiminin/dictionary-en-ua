import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const FormField = ({ form, initialValues, component, ...props }) => {
  const Cmp = component || TextField;

  return <Cmp value={form[props.name]} {...props} />;
};

FormField.propTypes = {
  component: PropTypes.func,
  name: PropTypes.string.isRequired,
  form: PropTypes.instanceOf(Object),
  initialValues: PropTypes.instanceOf(Object),
};

FormField.defaultProps = {
  form: {},
  initialValues: {},
  component: null,
};

export default FormField;
