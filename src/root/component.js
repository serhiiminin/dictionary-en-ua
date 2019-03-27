import React from 'react';
import { ThemeProvider } from 'react-jss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider, Zoom } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { PrivateRoute, Header, BlocksWrapper, Footer } from '../components';
import {
  LogInContainer,
  SignUpContainer,
  MainContainer,
  WordsListContainer,
  WordsAddContainer,
  PageNotFoundContainer,
  WordsEditContainer,
  WordPreviewContainer,
  WordSearchContainer,
} from '../pages';
import StateProvider from '../context';
import routes from '../routes';
import muiTheme from './mui-theme';
import config from '../config';

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
    <MuiThemeProvider theme={muiTheme}>
      <Router basename={config.publicUrl}>
        <SnackbarProvider {...snackbarConfig}>
          <StateProvider>
            <BlocksWrapper>
              <Header />
              <Switch>
                <Route exact path={routes.root} component={MainContainer} />
                <Route exact path={routes.auth.logIn} component={LogInContainer} />
                <Route exact path={routes.auth.signUp} component={SignUpContainer} />
                <PrivateRoute exact path={routes.words.add} component={WordsAddContainer} />
                <PrivateRoute exact path={routes.words.list} component={WordsListContainer} />
                <PrivateRoute exact path={routes.words.search} component={WordSearchContainer} />
                <PrivateRoute exact path={routes.words.preview} component={WordPreviewContainer} />
                <PrivateRoute exact path={routes.words.edit} component={WordsEditContainer} />
                <Route component={PageNotFoundContainer} />
              </Switch>
              <Footer />
            </BlocksWrapper>
          </StateProvider>
        </SnackbarProvider>
      </Router>
    </MuiThemeProvider>
  </ThemeProvider>
);

export default Root;
