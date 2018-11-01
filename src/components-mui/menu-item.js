import React from "react";
import { MenuItem } from "@material-ui/core";
import styled from "styled-components";

const MenuItemCustomized = styled(props => (
  <MenuItem
    {...props}
    classes={{
      selected: "selected"
    }}
  />
))`
  && {
    width: 100%;
    &:hover {
      background: ${props => props.theme.main.colors.button} !important;
      color: ${props => props.theme.main.colors.background} !important;
    }
  }
  & .selected {
    background: ${props => props.theme.main.colors.button} !important;
    color: ${props => props.theme.main.colors.background} !important;
  }
`;

export default MenuItemCustomized;
