import React from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, Zoom } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { SnackbarProvider } from 'notistack';
import { PrivateRoute, Header, BlocksWrapper } from '../components';
import {
  AuthPage,
  MainPage,
  WordsListPage,
  WordsAddPage,
  PageNotFoundPage,
  WordsEditPage,
  WordPreviewPage,
  WordSearchPage,
} from '../pages';
import StateProvider from '../context';
import routes from '../routes';
import { muiTheme, GlobalStyle } from './styles';

const snackbarConfig = {
  TransitionComponent: Zoom,
  maxSnack: 5,
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  action: [<Close key="close" />],
};

const Root = () => (
  <ThemeProvider theme={muiTheme}>
    <>
      <GlobalStyle />
      <MuiThemeProvider theme={muiTheme}>
        <Router>
          <SnackbarProvider {...snackbarConfig}>
            <StateProvider>
              <BlocksWrapper>
                <Header />
                <Switch>
                  <Route exact path={routes.root} component={MainPage} />
                  <Route path={routes.auth.root} component={AuthPage} />
                  <PrivateRoute exact path={routes.words.add} component={WordsAddPage} />
                  <PrivateRoute exact path={routes.words.list} component={WordsListPage} />
                  <PrivateRoute exact path={routes.words.search} component={WordSearchPage} />
                  <PrivateRoute exact path={routes.words.preview} component={WordPreviewPage} />
                  <PrivateRoute exact path={routes.words.edit} component={WordsEditPage} />
                  <Route component={PageNotFoundPage} />
                </Switch>
              </BlocksWrapper>
            </StateProvider>
          </SnackbarProvider>
        </Router>
      </MuiThemeProvider>
    </>
  </ThemeProvider>
);

export default Root;
