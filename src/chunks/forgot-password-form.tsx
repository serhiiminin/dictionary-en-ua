import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import { ButtonSearch, Form, FormWrapper, TitleBlock } from '../components';
import LN from '../constants/loading-names';
import VL from '../constants/validation-lines';
import { withAuth } from '../context/auth';
import { withErrors } from '../context/errors';
import { withLoading } from '../context/loading';

const initialValues = {
  email: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(VL.required)
    .email(VL.email),
});

const fields = [
  {
    name: 'email',
    label: 'Email',
  },
];

const ForgotPasswordForm = ({ handleBasicForgotPassword, checkIsLoading }): JSX.Element => {
  const isLoading = checkIsLoading(LN.auth.logIn);

  return (
    <>
      <TitleBlock>Your email</TitleBlock>
      <FormWrapper marginTop={3.5}>
        <Form
          validateOnBlur
          isLoading={isLoading}
          validateOnChange={false}
          onSubmit={handleBasicForgotPassword}
          initialValues={initialValues}
          validationSchema={validationSchema}
          fields={fields}
          renderSubmit={(): JSX.Element => (
            <ButtonSearch type="submit" color="secondary" variant="contained">
              Send
            </ButtonSearch>
          )}
        />
      </FormWrapper>
    </>
  );
};

ForgotPasswordForm.propTypes = {
  handleBasicForgotPassword: PropTypes.func.isRequired,
  checkIsLoading: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withAuth,
  withErrors,
  withLoading
)(ForgotPasswordForm);
