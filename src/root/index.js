import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import injectSheet from 'react-jss';
import normalize from 'normalize-jss';
import { compose } from 'recompose';
import { variables } from '../styles/variables';
import { Header, BlocksContainer, Notifications } from '../components';
import { Main, MyWords, AddWord, SearchWord } from '../pages';
import StateProvider from '../context/provider';
import routes from '../routes';
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
    <StateProvider>
        <Router>
          <Notifications>
            <BlocksContainer>
              <Header/>
              <Switch>
                <Route exact path={routes.root} component={Main}/>
                <Route exact path={routes.login} render={() => 'login'}/>
                <Route exact path={routes.addWord} component={AddWord}/>
                <Route exact path={routes.searchWord} component={SearchWord}/>
                <Route exact path={routes.myWords} component={MyWords}/>
              </Switch>
            </BlocksContainer>
          </Notifications>
        </Router>
    </StateProvider>
  </MuiThemeProvider>
);

const Root = compose(
  injectSheet({
    ...normalize,
    ...styles
  }),
)(RootCmp);

export { Root };
