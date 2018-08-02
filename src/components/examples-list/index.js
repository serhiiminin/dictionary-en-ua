import React from 'react';
import PropTypes from 'prop-types';

const ExamplesList = ({ children }) => (
  <ul>{children}</ul>
);

ExamplesList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExamplesList;
