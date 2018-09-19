import React from 'react';
import { ButtonWithRouter } from '../../components';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';
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
  classes: classesShape,
};

PageNotFoundContainer.defaultProps = {
  classes: classesDefaultProps
};

export default PageNotFoundContainer;
