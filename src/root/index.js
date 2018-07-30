import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import injectSheet from 'react-jss';
import normalize from 'normalize-jss';
import { compose } from 'recompose';
import { variables } from '../styles/variables';
import { Main } from '../pages';
import styles from './styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: variables.colors.block,
      main: variables.colors.background,
      dark: variables.colors.button,
      contrastText: variables.colors.block,
    },
  },
});

const RootCmp = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/login" render={() => 'login'}/>
        <Route exact path="/" component={Main}/>
      </Switch>
    </Router>
  </MuiThemeProvider>
);

const Root = compose(
  injectSheet({
    ...normalize,
    ...styles
  }),
)(RootCmp);

export { Root };
