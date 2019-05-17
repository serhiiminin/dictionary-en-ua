import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { ButtonSearch, Form, FormWrapper } from '../../components';
import LN from '../../constants/loading-names';
import VL from '../../constants/validation-lines';
import SC from './styles';

const initialValues = {
  email: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(VL.required)
    .email(VL.email),
});

class ForgotPasswordForm extends Component {
  static propTypes = {
    handleBasicForgotPassword: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
  };

  handleSubmit = formData => {
    const { handleBasicForgotPassword } = this.props;

    return handleBasicForgotPassword(formData);
  };

  render() {
    const { checkIsLoading } = this.props;
    const isLoading = checkIsLoading(LN.auth.logIn);

    return (
      <div>
        <SC.Title>Your email</SC.Title>
        <FormWrapper>
          <Form
            validateOnBlur
            isLoading={isLoading}
            validateOnChange={false}
            onSubmit={this.handleSubmit}
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
      </div>
    );
  }
}

export default ForgotPasswordForm;
