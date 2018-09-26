import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWithRouter } from '../../components';
import routes from '../../routes';

const PageNotFoundContainer = ({ classes }) => (
  <div className={classes.notFound}>
    <h1>Page not found</h1>
    <ButtonWithRouter to={routes.root}>
      Home
    </ButtonWithRouter>
  </div>
);

PageNotFoundContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

PageNotFoundContainer.defaultProps = {
  classes: {},
};

export default PageNotFoundContainer;
