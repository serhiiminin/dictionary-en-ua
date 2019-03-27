import React from 'react';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import { ButtonWithRouter } from '..';
import styles from './styles';

const ButtonMenu = props => {
  const { classes, ...rest } = props;

  return <ButtonWithRouter className={classes.buttonMenu} variant="outlined" {...rest} />;
};

ButtonMenu.propTypes = {
  classes: composeClassesPropTypes(styles),
};

ButtonMenu.defaultProps = {
  classes: {},
};

export default ButtonMenu;
