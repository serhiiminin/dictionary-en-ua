import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ButtonControl, TextField } from "..";

export const MultipleInputsWrapper = styled.div`
  display: grid;
  row-gap: 1em;
`;

const MultipleInputs = ({
  items,
  placeholder,
  onRemoveItem,
  onChange,
  disabled
}) => (
  <MultipleInputsWrapper>
    {items.map(({ id, value }) => (
      <TextField
        onChange={event => onChange(id, event.target.value)}
        key={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        control={
          <ButtonControl
            color="primary"
            onClick={() => onRemoveItem(id)}
            title="Remove example"
            disabled={disabled}
          >
            <DeleteIcon />
          </ButtonControl>
        }
      />
    ))}
  </MultipleInputsWrapper>
);

MultipleInputs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  placeholder: PropTypes.string,
  onRemoveItem: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

MultipleInputs.defaultProps = {
  items: [],
  placeholder: null,
  disabled: false
};

export default MultipleInputs;
