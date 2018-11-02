import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import { ButtonControl } from "..";

const ButtonWithRouter = ({ location, to, staticContext, ...restProps }) => (
  <ButtonControl
    color="primary"
    component={Link}
    to={to}
    isActive={location.pathname === to}
    {...restProps}
  />
);

ButtonWithRouter.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  staticContext: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  to: PropTypes.string.isRequired
};

ButtonWithRouter.defaultProps = {
  staticContext: undefined
};

export default ButtonWithRouter;
