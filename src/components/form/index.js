import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import SC from './styles';

const FormContext = createContext({});

class Form extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    form: this.props.initialValues,
    fieldsErrors: Object.fromEntries(
      Object.entries(this.props.initialValues).map(([key]) => [key, { isError: true, values: [] }])
    ),
    errors: Object.fromEntries(
      Object.entries(this.props.initialValues).map(([key]) => [key, { isError: false, values: [] }])
    ),
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { form, fieldsErrors } = this.state;
    const isErrorPresent = Object.values(fieldsErrors).some(({ isError }) => isError === true);

    this.setState(prevState => ({
      errors: prevState.fieldsErrors,
    }));

    return !isErrorPresent && onSubmit(form);
  };

  onChange = (event, params) => {
    const { name, value } = event.target;
    const { isError, values } = params;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
      fieldsErrors: {
        ...prevState.fieldsErrors,
        [name]: {
          isError,
          values,
        },
      },
    }));
  };

  render() {
    const { form, fieldsErrors, errors } = this.state;
    const { children } = this.props;
    console.log(children);
    return (
      <FormContext.Provider
        value={{
          form,
          errors,
          fieldsErrors,
          onChange: this.onChange,
        }}
      >
        <SC.Form onSubmit={this.handleSubmit}>{children}</SC.Form>
      </FormContext.Provider>
    );
  }
}

export default Form;

export const withForm = Cmp => props => (
  <FormContext.Consumer>{value => <Cmp {...value} {...props} />}</FormContext.Consumer>
);
