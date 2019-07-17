import React from 'react';
import { Formik, Form as FormFormik } from 'formik';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { ThemeProps } from '../types';

const FormFormikStyled = styled(FormFormik)`
  display: grid;
  gap: ${(props: ThemeProps): string => props.theme.main.space.sm};
`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
      {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
        <FormFormikStyled onSubmit={handleSubmit}>
          {/* eslint-disable-next-line react/prop-types,@typescript-eslint/explicit-function-return-type */}
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
        </FormFormikStyled>
      )}
    </Formik>
  );
};

export default Form;
