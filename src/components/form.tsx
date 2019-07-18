import React from 'react';
import { Formik, Form as FormFormik, FormikProps } from 'formik';
import { Schema } from 'yup';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { ThemeProps, FormData } from '../types';

const FormFormikStyled = styled(FormFormik)`
  display: grid;
  gap: ${(props: ThemeProps): string => props.theme.main.space.sm};
`;

interface Field {
  name: string;
  type?: string;
  label: string;
  variant?: 'outlined';
  component?: React.ComponentType;
}

interface InitialValues {
  [propName: string]: string;
}

interface Props {
  renderSubmit?(submit: Function): JSX.Element;
  validationSchema: Schema<FormData>;
  initialValues: InitialValues;
  onSubmit(fd: FormData): void;
  fields: Field[];
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  isLoading: boolean;
}

const Form = (props: Props): JSX.Element => {
  const {
    renderSubmit,
    validationSchema,
    initialValues,
    onSubmit,
    fields,
    validateOnBlur,
    validateOnChange,
    isLoading,
  } = props;

  return (
    <Formik
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={({
        values,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
      }: FormikProps<FormData & InitialValues>): JSX.Element => (
        <FormFormikStyled>
          {fields.map(
            ({ name, type = 'text', label, variant = 'outlined', component }: Field): JSX.Element => {
              const Cmp = component || TextField;

              return (
                <Cmp
                  key={name}
                  type={type}
                  name={name}
                  label={label}
                  variant={variant}
                  value={values[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors[name])}
                  helperText={errors[name] || ' '}
                  disabled={isLoading}
                />
              );
            }
          )}
          <div>{renderSubmit && renderSubmit(handleSubmit)}</div>
        </FormFormikStyled>
      )}
    />
  );
};

export default Form;
