import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, Zoom } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { SnackbarProvider } from 'notistack';
import { PrivateRoute, Header, BlocksWrapper } from '../components-new';
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
import cairoRegularWoff from '../fonts/cairo-regular.woff';
import cairoRegularWoff2 from '../fonts/cairo-regular.woff2';

const GlobalStyle = createGlobalStyle`
body {
  overflow-x: hidden;
  color: ${props => props.theme.main.colors.text};
  font-size: 1em;
  margin: 0;
}
* {
  box-sizing: border-box;
  font-family: "Cairo", sans-serif;
},
@font-face {
  fontFamily: "Cairo";
  src: url(${cairoRegularWoff});
  fallbacks: [{ src: url(${cairoRegularWoff}) format(woff) }, { src: url(${cairoRegularWoff2}) format(woff2) }],
}
`;

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
              </BlocksWrapper>
            </StateProvider>
          </SnackbarProvider>
        </Router>
      </MuiThemeProvider>
    </>
  </ThemeProvider>
);

export default Root;
