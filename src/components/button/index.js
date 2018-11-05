import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const ButtonCustomized = styled(({ isActive, ...restProps }) => (
  <Button {...restProps} />
))`
  && {
    opacity: ${props =>
      props.isActive ? props.theme.main.opacity.disabled : 1};
    color: ${props => props.theme.palette.background.paper};
  }

  & .disabled {
    display: 'none';
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
