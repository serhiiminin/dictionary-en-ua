import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GridWordItemWrapper = styled(({ isChecked, isLoading, ...props }) => (
  <Grid {...props} />
))`
  opacity: ${props =>
    props.isLoading || props.isChecked ? props.theme.main.opacity.disabled : 1};
`;

const Description = styled(Grid)`
  padding: ${props => props.theme.main.padding.small} 0;
`;

const LinkToWords = styled(props => <Link {...props} />)`
  color: ${props => props.theme.palette.primary.main};
`;

const WordTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.9em;
`;

export { GridWordItemWrapper, Description, LinkToWords, WordTime };
