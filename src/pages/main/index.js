import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { Sidebar, Table, Content } from '../../components';
import styles from './styles';

const Main = ({ classes }) => (
  <main className={classes.main}>
    <Sidebar/>
    <Content>
      <Table />
    </Content>
  </main>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(Main);
