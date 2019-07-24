import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Zoom } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { PrivateRouteLoggedIn, Header } from '../components';
import { AuthPage, MainPage, WordPage, PageNotFoundPage } from '../pages';
import StateProvider from '../context';
import routes from '../routes';
import config from '../config';
import { muiTheme, GlobalStyle } from './styles';

const snackbarConfig = {
  TransitionComponent: Zoom,
  maxSnack: 5,
  preventDuplicate: true,
};

const Root = (): JSX.Element => (
  <ThemeProvider theme={muiTheme}>
    <MuiThemeProvider theme={muiTheme}>
      <GlobalStyle />
      <Router basename={config.publicUrl}>
        <SnackbarProvider {...snackbarConfig}>
          <StateProvider>
            <>
              <Header />
              <Switch>
                <Route exact path={routes.root} component={MainPage} />
                <Route path={routes.auth.root} component={AuthPage} />
                <PrivateRouteLoggedIn path={routes.words.root} component={WordPage} />
                <Route component={PageNotFoundPage} />
              </Switch>
            </>
          </StateProvider>
        </SnackbarProvider>
      </Router>
    </MuiThemeProvider>
  </ThemeProvider>
);

export default Root;
