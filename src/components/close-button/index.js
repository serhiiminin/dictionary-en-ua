import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

const StyledButton = styled.button`
  background: transparent;
  color: ${props => props.theme.main.colors.text};
  padding: 0;
  border: 0;
  border-radius: 50%;
  font-size: 0.81em;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const CloseButton = ({ onClick }) => (
  <StyledButton
    type="button"
    onClick={onClick}
  >
    <CloseIcon />
  </StyledButton>
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CloseButton;
