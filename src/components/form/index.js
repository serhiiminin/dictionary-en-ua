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
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { form } = this.state;

    onSubmit(form);
  };

  onChange = event => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  };

  render() {
    const { form } = this.state;
    const { children } = this.props;

    return (
      <FormContext.Provider
        value={{
          form,
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
