import React from "react";
import { Chip } from "@material-ui/core";
import styled from "styled-components";

const ChipCustomized = styled(props => <Chip {...props} />)`
  && {
    font-size: 0.9em;
    background: transparent;
    border: ${props =>
      [
        props.theme.main.borderWidth.base,
        props.theme.main.borderStyle.base,
        props.theme.main.colors.text
      ]
        .filter(Boolean)
        .join(" ")};
    color: ${props => props.theme.main.colors.text};
    opacity: ${props => props.theme.main.opacity.disabled};
  }
`;

export default ChipCustomized;
