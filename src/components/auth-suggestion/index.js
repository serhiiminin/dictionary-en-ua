import React from 'react';
import PropTypes from 'prop-types';
import SC from './styles';

const AuthSuggestion = ({ title, description, control }) => (
  <SC.Wrapper>
    <SC.Inner>
      <SC.Title>{title}</SC.Title>
      <SC.Description>{description}</SC.Description>
      <SC.Control>{control}</SC.Control>
    </SC.Inner>
  </SC.Wrapper>
);

AuthSuggestion.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  control: PropTypes.node,
};

AuthSuggestion.defaultProps = {
  control: null,
};

export default AuthSuggestion;
