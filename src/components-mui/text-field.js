import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const TextFieldWrapper = styled.div`
  display: ${props => (props.control ? "grid" : "initial")};
  row-gap: ${props => (props.control ? ".5rem" : "initial")};
  column-gap: ${props => (props.control ? "1rem" : "initial")};
  justify-content: ${props => (props.control ? "space-between" : "initial")};
  align-items: ${props => (props.control ? "center" : "initial")};
  grid-template-columns: ${props => (props.control ? "100fr 1fr" : "initial")};
  margin-bottom: ${props =>
    props.control ? "initial" : props.theme.main.margin.medium};
`;

const StyledTextField = styled(props => (
  <TextField
    {...props}
    InputProps={{
      classes: {
        underline: "underline"
      }
    }}
    InputLabelProps={{
      className: "label"
    }}
  />
))`
  && {
    width: 100%;
  }
  & .label {
    color: ${props => props.theme.main.colors.text} !important;
    opacity: 0.7;
  }
  & .underline {
    &:after {
      border-bottom-color: ${props => props.theme.main.colors.text} !important;
    }
  }
`;

const TextFieldCustomized = ({ classes, control, ...restProps }) => (
  <TextFieldWrapper control={control}>
    <StyledTextField {...restProps} />
    {control}
  </TextFieldWrapper>
);

TextFieldCustomized.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  control: PropTypes.node
};

TextFieldCustomized.defaultProps = {
  control: null,
  classes: {}
};

export default TextFieldCustomized;
