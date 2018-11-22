import React from "react";
import { ButtonWithRouter } from "../../components";
import routes from "../../routes";
import composeClassesPropTypes from '../../helpers/compose-classes-prop-types';
import styles from './styles';

const PageNotFoundContainer = ({ classes }) => (
  <div className={classes.notFoundWrapper}>
    <h1>Page not found</h1>
    <ButtonWithRouter to={routes.root}>Home</ButtonWithRouter>
  </div>
);

PageNotFoundContainer.propTypes = {
  classes: composeClassesPropTypes(styles),
}

PageNotFoundContainer.defaultProps = {
  classes: {},
}

export default PageNotFoundContainer;
