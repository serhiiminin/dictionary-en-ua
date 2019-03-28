import React from 'react';
import { Button } from '@material-ui/core';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const ButtonSearch = props => {
  const { classes, ...rest } = props;

  return <Button className={classes.buttonSearch} {...rest} />;
};

ButtonSearch.propTypes = {
  classes: composeClassesPropTypes(styles),
};

ButtonSearch.defaultProps = {
  classes: {},
};

export default ButtonSearch;
