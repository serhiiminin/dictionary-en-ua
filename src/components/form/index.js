import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@material-ui/core';
import SC from './styles';

const Form = props => {
  const {
    // eslint-disable-next-line react/prop-types
    renderSubmit,
    // eslint-disable-next-line react/prop-types,react/prop-types
    validationSchema,
    // eslint-disable-next-line react/prop-types
    initialValues,
    // eslint-disable-next-line react/prop-types
    onSubmit,
    // eslint-disable-next-line react/prop-types,react/prop-types
    fields,
    // eslint-disable-next-line react/prop-types
    validateOnBlur,
    // eslint-disable-next-line react/prop-types
    validateOnChange,
    // eslint-disable-next-line react/prop-types
    isLoading,
  } = props;

  return (
    <Formik
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
        <SC.Form onSubmit={handleSubmit}>
          {/* eslint-disable-next-line react/prop-types */}
          {fields.map(({ name, type = 'text', label, variant = 'outlined', component }) => {
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
                helperText={errors[name] || ' '}
                disabled={isLoading}
              />
            );
          })}
          <div>{renderSubmit && renderSubmit(handleSubmit)}</div>
        </SC.Form>
      )}
    </Formik>
  );
};

export default Form;
