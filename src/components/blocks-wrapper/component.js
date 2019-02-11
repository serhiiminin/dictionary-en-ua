import React from 'react';
import PropTypes from 'prop-types';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const BlocksWrapper = ({ children, classes }) => (
  <div className={classes.blocksWrapper}>{children}</div>
);

BlocksWrapper.propTypes = {
  classes: composeClassesPropTypes(styles),
  children: PropTypes.node.isRequired,
};

BlocksWrapper.defaultProps = {
  classes: {},
};

export default BlocksWrapper;
