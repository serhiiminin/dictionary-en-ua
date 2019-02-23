import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const Logout = ({ classes, handleLogout }) => (
  <div className={classes.logout}>
    <Button onClick={handleLogout}>Logout</Button>
  </div>
);

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  classes: composeClassesPropTypes(styles),
};

Logout.defaultProps = {
  classes: {},
};

export default Logout;
