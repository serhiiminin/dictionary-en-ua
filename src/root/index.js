import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as JssProvider } from "react-jss";
import { Normalize } from "styled-normalize";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { Header, BlocksWrapper, Notifications } from "../components";
import {
  LoginContainer,
  LogoutContainer,
  MainContainer,
  WordsListContainer,
  WordsAddContainer,
  WordsSearchContainer,
  PageNotFoundContainer,
  WordsLearnContainer,
  WordsEditContainer,
  WordPreviewContainer
} from "../pages";
import StateProvider from "../context";
import routes from "../routes";
import muiTheme from "./mui-theme";
import GlobalStyle from "./styles";

const Root = () => (
  <JssProvider theme={muiTheme}>
    <ThemeProvider theme={muiTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <Fragment>
          <Normalize />
          <GlobalStyle />
            <Router>
              <StateProvider>
                <Notifications>
                  <BlocksWrapper>
                    <Header />
                    <Switch>
                      <Route exact path={routes.root} component={MainContainer} />
                      <Route exact path={routes.login} component={LoginContainer} />
                      <Route exact path={routes.logout} component={LogoutContainer} />
                      <Route exact path={routes.words.add} component={WordsAddContainer} />
                      <Route exact path={routes.words.learn} component={WordsLearnContainer} />
                      <Route exact path={routes.words.list.all} component={WordsListContainer} />
                      <Route exact path={routes.words.list.preview} component={WordPreviewContainer} />
                      <Route exact path={routes.words.list.edit} component={WordsEditContainer} />
                      <Route exact path={routes.words.search} component={WordsSearchContainer} />
                      <Route component={PageNotFoundContainer} />
                    </Switch>
                  </BlocksWrapper>
                </Notifications>
              </StateProvider>
            </Router>
        </Fragment>
      </MuiThemeProvider>
    </ThemeProvider>
  </JssProvider>
);

export default Root;
