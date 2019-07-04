import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import NT from '../constants/notifications-type';
import routes from '../routes';
import { getErrorMessage, getErrorType } from '../util/handle-errors';

const { Provider, Consumer } = createContext({});

class ErrorsProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
  };

  handleError = error => {
    const { history, enqueueSnackbar } = this.props;
    if (error.message === NT.error.forbidden) {
      history.push(routes.auth.logIn);
    }
    const errorMessage = getErrorMessage(getErrorType(error));
    enqueueSnackbar(errorMessage, { variant: NT.info });
  };

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    console.log(error, info);
  }

  render() {
    const { children } = this.props;

    return (
      <Provider
        value={{
          handleError: this.handleError,
        }}
      >
        {children}
      </Provider>
    );
  }
}

const ErrorProvider = compose(
  withSnackbar,
  withRouter
)(ErrorsProviderCmp);

const withErrors = Cmp => props => <Consumer>{value => <Cmp {...value} {...props} />}</Consumer>;

export { ErrorProvider, withErrors };
