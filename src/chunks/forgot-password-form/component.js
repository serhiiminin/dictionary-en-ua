import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { ButtonSearch, Form, FormWrapper, TitleBlock } from '../../components';
import LN from '../../constants/loading-names';
import VL from '../../constants/validation-lines';

const initialValues = {
  email: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(VL.required)
    .email(VL.email),
});

const ForgotPasswordForm = ({ handleBasicForgotPassword, checkIsLoading }) => {
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
          fields={[
            {
              name: 'email',
              label: 'Email',
            },
          ]}
          renderSubmit={() => (
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

export default ForgotPasswordForm;
