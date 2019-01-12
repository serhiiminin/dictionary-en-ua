import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { compose } from "recompose";
import { withRouter } from 'react-router-dom';
import { withNotifications } from "./notifications";
import notificationType from "../constants/notifications-type";
import routes from "../routes";
import { getErrorMessage } from "../modules/handle-errors";

const ErrorsContext = createContext({});

class ErrorsProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    showNotification: PropTypes.func.isRequired,
  };

  handleError = error => {
    const { history, showNotification } = this.props;
    if(error.message === notificationType.error.forbidden) {
      history.push(routes.login);
    }
    showNotification(getErrorMessage(error), notificationType.info)
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    console.log(error, info);
  }

  render() {
    const { children } = this.props;

    return (
      <ErrorsContext.Provider
        value={{
          handleError: this.handleError,
        }}>
        {children}
      </ErrorsContext.Provider>
    );
  }
}

const ErrorProvider = compose(
  withNotifications,
  withRouter,
)(ErrorsProviderCmp);

const withErrors = Cmp => props => (
  <ErrorsContext.Consumer>{value => <Cmp {...value} {...props} />}</ErrorsContext.Consumer>
);

export { ErrorProvider, withErrors };
