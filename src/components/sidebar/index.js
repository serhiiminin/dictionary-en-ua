import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withWords } from '../../context/words';
import { Form, SearchBlock } from '../index';
import styles from './styles';

const Sidebar = ({ classes }) => (
  <div className={classes.sidebar}>
    <Form />
    <SearchBlock />
  </div>
);

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(Sidebar);
