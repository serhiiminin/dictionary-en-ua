import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { TextField } from '@material-ui/core';
import SC from './styles';

const FormCmp = ({
  renderSubmit,
  validationSchema,
  initialValues,
  onSubmit,
  fields,
  validateOnBlur,
  validateOnChange,
}) => {
  return (
    <Formik
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm(initialValues);
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
        <SC.Form onSubmit={handleSubmit}>
          {fields.map(({ name = '', type = 'text', label = '', variant = 'outlined', component }) => {
            const Cmp = component || TextField;

            return (
              <Cmp
                key={name}
                type={type}
                name={name}
                label={label}
                variant={variant}
                values={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors[name])}
                helperText={errors[name]}
                disabled={isSubmitting}
              />
            );
          })}
          {renderSubmit && renderSubmit(handleSubmit)}
        </SC.Form>
      )}
    </Formik>
  );
};

FormCmp.propTypes = {
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      label: PropTypes.string,
      variant: PropTypes.string,
      component: PropTypes.func,
    })
  ),
  renderSubmit: PropTypes.func,
  validationSchema: PropTypes.shape({}),
  initialValues: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
};

FormCmp.defaultProps = {
  fields: [],
  validateOnBlur: false,
  validateOnChange: false,
  renderSubmit: null,
  validationSchema: null,
  initialValues: {},
};

export default FormCmp;
