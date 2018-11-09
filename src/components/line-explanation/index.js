import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const LineExplanationWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.label ? "1fr 2fr" : "1fr")};
  background: ${props => props.theme.palette.primary.light};
  padding: ${props => props.theme.main.padding.medium};
  margin-bottom: ${props => props.theme.main.margin.medium};
  border-radius: ${props => props.theme.main.borderRadius.small};
`;

const LineExplanation = ({ label, children }) => (
  <LineExplanationWrapper>
    {label && <div>{`${label}:`}</div>}
    <div>{children}</div>
  </LineExplanationWrapper>
);

LineExplanation.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node
};

LineExplanation.defaultProps = {
  label: null,
  children: null
};

export default LineExplanation;
