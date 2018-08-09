import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { Table, ButtonWithRouter, ControlsSeparator } from '../../components';
import { withNotifications } from '../../context/notifications';
import routes from '../../routes';
import styles from './styles';

const MyWords = ({ classes }) => (
  <main className={classes.myWords}>
    <ControlsSeparator align='right'>
      <ButtonWithRouter to={routes.addWord}>Add a new word</ButtonWithRouter>
    </ControlsSeparator>
    <Table/>
  </main>
);

MyWords.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const enhance = compose(
  injectSheet(styles),
  withNotifications
);

export default enhance(MyWords);
