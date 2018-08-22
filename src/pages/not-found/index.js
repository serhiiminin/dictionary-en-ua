import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { ButtonWithRouter } from '../../components';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const PageNotFound = ({ classes }) => (
  <div className={classes.notFound}>
    <h1>Page not found</h1>
    <ButtonWithRouter to='/'>
      Home
    </ButtonWithRouter>
  </div>
);

PageNotFound.propTypes = {
  classes: classesShape.isRequired,
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(PageNotFound);
