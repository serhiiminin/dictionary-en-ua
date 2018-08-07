import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import ResizeDetector from 'react-resize-detector';
import { Sidebar, Table, Content } from '../../components';
import styles from './styles';

const Main = ({ classes }) => (
  <ResizeDetector
    handleWidth
    handleHeight
    render={({ width }) => (
      <main className={classes.main}>
        <Sidebar/>
        <Content>
          <Table screenWidth={width}/>
        </Content>
      </main>
    )}
  />
);

Main.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(Main);
