import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const ButtonCustomized = styled(({ isActive, ...restProps }) => (
  <Button
    {...restProps}
    classes={{
      disabled: "disabled"
    }}
  />
))`
  && {
    text-transform: none;
    transition: ${props => props.theme.main.transition};
    opacity: ${props =>
      props.isActive ? props.theme.main.opacity.disabled : 1};
  }
  &:hover {
    background: ${props => props.theme.main.colors.button};
    opacity: ${props => props.theme.main.opacity.disabled};
  }
  & .disabled {
    opacity: ${props => props.theme.main.opacity.disabled};
    background: ${props => props.theme.main.colors.button};
    color: ${props => props.theme.main.colors.background} !important;
  }
`;

ButtonCustomized.propTypes = {
  isActive: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string)
};

ButtonCustomized.defaultProps = {
  isActive: false,
  classes: {}
};

export default ButtonCustomized;
