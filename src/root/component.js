import React from 'react';
import { ThemeProvider } from 'react-jss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider, Zoom } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { PrivateRoute, Header, BlocksWrapper, Footer } from '../components';
import {
  LoginContainer,
  SignupContainer,
  MainContainer,
  WordsListContainer,
  WordsAddContainer,
  PageNotFoundContainer,
  WordsLearnContainer,
  WordsEditContainer,
  WordPreviewContainer,
} from '../pages';
import StateProvider from '../context';
import routes from '../routes';
import muiTheme from './mui-theme';

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
      <Router basename={process.env.PUBLIC_URL}>
        <SnackbarProvider {...snackbarConfig}>
          <StateProvider>
            <BlocksWrapper>
              <Header />
              <Switch>
                <Route exact path={routes.root} component={MainContainer} />
                <Route
                  exact
                  path={routes.auth.login}
                  component={LoginContainer}
                />
                <Route
                  exact
                  path={routes.auth.signup}
                  component={SignupContainer}
                />
                <PrivateRoute
                  exact
                  path={routes.words.add}
                  component={WordsAddContainer}
                />
                <PrivateRoute
                  exact
                  path={routes.words.learn}
                  component={WordsLearnContainer}
                />
                <PrivateRoute
                  exact
                  path={routes.words.list}
                  component={WordsListContainer}
                />
                <PrivateRoute
                  exact
                  path={routes.words.preview}
                  component={WordPreviewContainer}
                />
                <PrivateRoute
                  exact
                  path={routes.words.edit}
                  component={WordsEditContainer}
                />
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
