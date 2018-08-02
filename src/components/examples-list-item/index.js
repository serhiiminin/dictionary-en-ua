import React from 'react';
import PropTypes from 'prop-types';

const ExamplesListItem = ({ example }) => (
  <li>{example}</li>
);

ExamplesListItem.propTypes = {
  example: PropTypes.string,
};

ExamplesListItem.defaultProps = {
  example: '',
};

export default ExamplesListItem;
