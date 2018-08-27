import React from 'react';
import { ButtonWithRouter } from '../../components';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';

const PageNotFound = ({ classes }) => (
  <div className={classes.notFound}>
    <h1>Page not found</h1>
    <ButtonWithRouter to='/'>
      Home
    </ButtonWithRouter>
  </div>
);

PageNotFound.propTypes = {
  classes: classesShape,
};

PageNotFound.defaultProps = {
  classes: classesDefaultProps
};

export default PageNotFound;
