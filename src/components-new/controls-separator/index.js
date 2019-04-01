import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledControlsSeparator = styled.div`
  display: grid;
  align-content: center;
  grid-auto-flow: column;
  padding: ${props => props.theme.main.padding.medium} 0;
  justify-content: ${props => props.align};
  column-gap: 0.5rem;
  row-gap: 0.5rem;
`;

const ControlsSeparator = props => <StyledControlsSeparator {...props} />;

ControlsSeparator.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
};

ControlsSeparator.defaultProps = {
  align: 'left',
};

export default ControlsSeparator;
