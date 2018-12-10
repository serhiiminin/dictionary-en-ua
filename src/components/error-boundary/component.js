import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    console.log(error, info);
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
