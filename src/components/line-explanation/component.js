import React from 'react';
import PropTypes from 'prop-types';

const LineExplanation = ({ label, children }) => (
  <div>
    {label && <div>{`${label}:`}</div>}
    <div>{children}</div>
  </div>
);

LineExplanation.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
};

LineExplanation.defaultProps = {
  label: null,
  children: null,
};

export default LineExplanation;
